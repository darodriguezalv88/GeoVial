import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUniqueLicenseKey } from "@/lib/license";
import { sendLicenseEmail } from "@/lib/email";
import {
  verifyWebhookSignature,
  planFromVariantId,
  licenseStatusFromSubscriptionStatus,
} from "@/lib/lemonsqueezy";

/** Eventos de suscripción que sabemos interpretar; el resto se ignora (ack 200). */
const HANDLED_EVENTS = new Set([
  "subscription_created",
  "subscription_updated",
  "subscription_cancelled",
  "subscription_resumed",
  "subscription_expired",
  "subscription_paused",
  "subscription_unpaused",
]);

type LemonSqueezySubscriptionAttributes = {
  status: string;
  variant_id: number | string;
  customer_id?: number | string;
  user_email?: string;
  user_name?: string;
  renews_at?: string | null;
  ends_at?: string | null;
  trial_ends_at?: string | null;
};

export async function POST(req: NextRequest) {
  // La firma se calcula sobre el cuerpo crudo: hay que leerlo como texto
  // antes de parsear el JSON.
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Firma inválida." }, { status: 401 });
  }

  let payload: {
    meta?: { event_name?: string };
    data?: { id?: string; attributes?: LemonSqueezySubscriptionAttributes };
  };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Cuerpo no es JSON válido." }, { status: 400 });
  }

  const eventName = payload.meta?.event_name;
  const attrs = payload.data?.attributes;
  const lsSubscriptionId = payload.data?.id;

  if (!eventName || !HANDLED_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: true, ignored: eventName ?? null });
  }

  if (!attrs || !lsSubscriptionId) {
    console.error("[webhook lemonsqueezy]", eventName, "sin data.attributes o data.id");
    return NextResponse.json({ error: "Payload incompleto." }, { status: 400 });
  }

  const email = attrs.user_email?.trim().toLowerCase();
  if (!email) {
    console.error("[webhook lemonsqueezy]", eventName, "sin user_email");
    return NextResponse.json({ error: "Falta user_email." }, { status: 400 });
  }

  const plan = planFromVariantId(attrs.variant_id);
  if (!plan) {
    console.error("[webhook lemonsqueezy] variantId no reconocida:", attrs.variant_id);
    return NextResponse.json({ error: "variantId no reconocida." }, { status: 400 });
  }

  const status = licenseStatusFromSubscriptionStatus(attrs.status);

  // "Válido hasta": ends_at si ya canceló/expiró, si no renews_at (o el fin
  // de trial como último recurso). Esta fecha manda por encima del status
  // para decidir si la licencia sigue usable en /validate.
  const periodEndRaw = attrs.ends_at ?? attrs.renews_at ?? attrs.trial_ends_at ?? null;
  const currentPeriodEnd = periodEndRaw ? new Date(periodEndRaw) : null;

  const existing = await prisma.license.findUnique({ where: { email } });
  const isFirstActivationOfThisSubscription = !existing?.lsSubscriptionId;

  const license = await prisma.license.upsert({
    where: { email },
    create: {
      email,
      name: attrs.user_name ?? null,
      key: await generateUniqueLicenseKey(),
      plan,
      status,
      currentPeriodEnd,
      lsCustomerId: attrs.customer_id != null ? String(attrs.customer_id) : null,
      lsSubscriptionId: String(lsSubscriptionId),
    },
    update: {
      name: attrs.user_name ?? existing?.name ?? null,
      plan,
      status,
      currentPeriodEnd,
      lsCustomerId: attrs.customer_id != null ? String(attrs.customer_id) : null,
      lsSubscriptionId: String(lsSubscriptionId),
    },
  });

  // Solo se envía la clave la primera vez que esta suscripción se activa
  // (nueva compra o conversión de un registro de lista de espera), nunca en
  // renovaciones ni cancelaciones. El estado de la licencia ya quedó
  // guardado arriba, así que un fallo de envío no debe hacer que Lemon
  // Squeezy reintente el webhook completo (nuestra idempotencia por
  // lsSubscriptionId ya impediría reintentar el envío del correo igual).
  if (isFirstActivationOfThisSubscription && status === "ACTIVE") {
    try {
      await sendLicenseEmail({ email: license.email, name: license.name, key: license.key });
    } catch (err) {
      console.error("[webhook lemonsqueezy] Falló el envío del correo de bienvenida:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
