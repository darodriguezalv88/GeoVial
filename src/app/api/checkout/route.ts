import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUniqueLicenseKey } from "@/lib/license";
import { PLANS, type PlanId } from "@/lib/plans";
import { getAcceptanceTokens, createPaymentSource, createTransaction } from "@/lib/wompi";

/**
 * Recibe el token de tarjeta ya generado en el navegador (los datos de la
 * tarjeta nunca pasan por este servidor) y completa el cobro inicial:
 * crea la fuente de pago reutilizable en Wompi, cobra el primer período y
 * deja la licencia en la base de datos con status PAST_DUE hasta que el
 * webhook confirme el pago (o ACTIVE de una vez si Wompi ya respondió
 * APPROVED de forma síncrona).
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { name, email, plan: planId, cardToken } = body ?? {};

  if (!email || typeof email !== "string" || !cardToken || typeof cardToken !== "string") {
    return NextResponse.json({ error: "Faltan datos requeridos." }, { status: 400 });
  }
  const plan = PLANS[planId as PlanId];
  if (!plan) {
    return NextResponse.json({ error: "Plan inválido." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const { acceptanceToken, acceptPersonalAuth } = await getAcceptanceTokens();

    const paymentSource = await createPaymentSource({
      cardToken,
      customerEmail: normalizedEmail,
      acceptanceToken,
      acceptPersonalAuth,
    });

    const reference = `checkout-${crypto.randomUUID()}`;
    const transaction = await createTransaction({
      amountInCents: plan.priceCop * 100,
      customerEmail: normalizedEmail,
      reference,
      paymentSourceId: paymentSource.id,
    });

    const approved = transaction.status === "APPROVED";
    const periodMs = plan.id === "MONTHLY" ? 31 * 24 * 60 * 60 * 1000 : 366 * 24 * 60 * 60 * 1000;

    const existing = await prisma.license.findUnique({ where: { email: normalizedEmail } });
    const isNewSubscriber = !existing?.wompiPaymentSourceId;

    const license = await prisma.license.upsert({
      where: { email: normalizedEmail },
      create: {
        email: normalizedEmail,
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

    if (approved && isNewSubscriber) {
      const { sendLicenseEmail } = await import("@/lib/email");
      try {
        await sendLicenseEmail({ email: license.email, name: license.name, key: license.key });
      } catch (err) {
        console.error("[checkout] Falló el envío del correo de bienvenida:", err);
      }
    }

    return NextResponse.json({
      status: transaction.status,
      transactionId: transaction.id,
    });
  } catch (err) {
    console.error("[checkout] Error creando el cobro:", err);
    return NextResponse.json({ error: "No se pudo procesar el pago. Intenta de nuevo." }, { status: 502 });
  }
}
