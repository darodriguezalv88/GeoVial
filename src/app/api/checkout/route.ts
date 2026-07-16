import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUniqueLicenseKey } from "@/lib/license";
import { PLANS, type PlanId } from "@/lib/plans";
import { getAcceptanceTokens, createPaymentSource, createTransaction } from "@/lib/wompi";

/** Los tokens de tarjeta de Wompi siempre tienen este prefijo (tok_test_/tok_prod_).
 * El widget de tokenización somete el formulario con el token en un campo
 * oculto cuyo nombre exacto Wompi no documenta públicamente, así que en vez
 * de asumir un nombre de campo, se busca el valor que matchea el patrón. */
function extractCardToken(formData: FormData): string | null {
  for (const value of formData.values()) {
    if (typeof value === "string" && /^tok_(test|prod)_/.test(value)) return value;
  }
  return null;
}

/**
 * Recibe el POST del formulario de /checkout una vez el widget de Wompi
 * termina de tokenizar la tarjeta (dentro de su propio iframe — los datos
 * de la tarjeta nunca pasan por este servidor) y completa el cobro
 * inicial: crea la fuente de pago reutilizable en Wompi, cobra el primer
 * período y deja la licencia en la base de datos con status PAST_DUE hasta
 * que el webhook confirme el pago (o ACTIVE de una vez si Wompi ya
 * respondió APPROVED de forma síncrona). Termina con un redirect (no JSON)
 * porque es una sumisión de formulario real, no una llamada AJAX.
 */
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const plan = PLANS[formData.get("plan")?.toString() as PlanId];
  const cardToken = extractCardToken(formData);

  if (!email || !cardToken || !plan) {
    return NextResponse.redirect(new URL("/checkout/gracias?status=ERROR", req.url), 303);
  }

  try {
    const { acceptanceToken, acceptPersonalAuth } = await getAcceptanceTokens();

    const paymentSource = await createPaymentSource({
      cardToken,
      customerEmail: email,
      acceptanceToken,
      acceptPersonalAuth,
    });

    const reference = `checkout-${crypto.randomUUID()}`;
    const transaction = await createTransaction({
      amountInCents: plan.priceCop * 100,
      customerEmail: email,
      reference,
      paymentSourceId: paymentSource.id,
    });

    const approved = transaction.status === "APPROVED";
    const periodMs = plan.id === "MONTHLY" ? 31 * 24 * 60 * 60 * 1000 : 366 * 24 * 60 * 60 * 1000;

    const existing = await prisma.license.findUnique({ where: { email } });
    // Manda el correo cada vez que la licencia pasa a estar activa desde un
    // estado que no lo estaba (nueva, o reactivada tras cancelación/
    // vencimiento) — no solo la primerísima vez que se creó un
    // payment_source, porque alguien puede cancelar y volver a comprar con
    // el mismo correo más adelante y sí necesita el correo de nuevo.
    const wasActive = existing?.status === "ACTIVE";

    const license = await prisma.license.upsert({
      where: { email },
      create: {
        email,
        name: name || null,
        key: await generateUniqueLicenseKey(),
        plan: plan.id,
        status: approved ? "ACTIVE" : "PAST_DUE",
        currentPeriodEnd: approved ? new Date(Date.now() + periodMs) : null,
        wompiPaymentSourceId: String(paymentSource.id),
        wompiLastTransactionId: transaction.id,
      },
      update: {
        name: name || existing?.name || null,
        plan: plan.id,
        status: approved ? "ACTIVE" : "PAST_DUE",
        currentPeriodEnd: approved ? new Date(Date.now() + periodMs) : existing?.currentPeriodEnd,
        wompiPaymentSourceId: String(paymentSource.id),
        wompiLastTransactionId: transaction.id,
      },
    });

    if (approved && !wasActive) {
      const { sendLicenseEmail } = await import("@/lib/email");
      try {
        await sendLicenseEmail({ email: license.email, name: license.name, key: license.key, licenseId: license.id });
      } catch (err) {
        console.error("[checkout] Falló el envío del correo de bienvenida:", err);
      }
    }

    const redirectUrl = new URL("/checkout/gracias", req.url);
    redirectUrl.searchParams.set("status", transaction.status);
    redirectUrl.searchParams.set("email", email);
    return NextResponse.redirect(redirectUrl, 303);
  } catch (err) {
    console.error("[checkout] Error creando el cobro:", err);
    return NextResponse.redirect(new URL("/checkout/gracias?status=ERROR", req.url), 303);
  }
}
