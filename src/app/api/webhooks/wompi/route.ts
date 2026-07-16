import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/wompi";

type WompiTransactionEvent = {
  event: string;
  data: {
    transaction: {
      id: string;
      status: string;
      payment_source_id?: number;
      customer_email?: string;
      reference: string;
    };
  };
  signature: { checksum: string; properties: string[] };
  timestamp: number;
};

/**
 * Wompi no maneja "suscripciones": cada cobro (inicial o de renovación) es
 * una transacción independiente que confirmamos aquí. La licencia ya se
 * activó de forma síncrona en /api/checkout si Wompi respondió APPROVED de
 * inmediato — este webhook es la confirmación asíncrona (y la única fuente
 * de verdad cuando el banco tarda en aprobar).
 */
export async function POST(req: NextRequest) {
  const payload = (await req.json().catch(() => null)) as WompiTransactionEvent | null;
  if (!payload) {
    return NextResponse.json({ error: "Cuerpo no es JSON válido." }, { status: 400 });
  }

  if (!verifyWebhookSignature({ data: payload.data, signature: payload.signature, timestamp: payload.timestamp })) {
    return NextResponse.json({ error: "Firma inválida." }, { status: 401 });
  }

  if (payload.event !== "transaction.updated") {
    return NextResponse.json({ ok: true, ignored: payload.event });
  }

  const { transaction } = payload.data;
  const license = await prisma.license.findFirst({
    where: { wompiLastTransactionId: transaction.id },
  });

  if (!license) {
    // Puede llegar antes de que /api/checkout termine de guardar la
    // licencia, o ser de una transacción que no nos interesa; no es error.
    return NextResponse.json({ ok: true, ignored: "no license for transaction" });
  }

  if (transaction.status === "APPROVED") {
    const alreadyActive = license.status === "ACTIVE" && license.wompiLastTransactionId === transaction.id;
    const periodMs =
      license.plan === "ANNUAL" ? 366 * 24 * 60 * 60 * 1000 : 31 * 24 * 60 * 60 * 1000;

    await prisma.license.update({
      where: { id: license.id },
      data: {
        status: "ACTIVE",
        currentPeriodEnd: new Date(Date.now() + periodMs),
      },
    });

    if (!alreadyActive) {
      const { sendLicenseEmail } = await import("@/lib/email");
      try {
        await sendLicenseEmail({ email: license.email, name: license.name, key: license.key, licenseId: license.id });
      } catch (err) {
        console.error("[webhook wompi] Falló el envío del correo de bienvenida:", err);
      }
    }
  } else if (transaction.status === "DECLINED" || transaction.status === "ERROR" || transaction.status === "VOIDED") {
    await prisma.license.update({
      where: { id: license.id },
      data: { status: "PAST_DUE" },
    });
  }

  return NextResponse.json({ ok: true });
}
