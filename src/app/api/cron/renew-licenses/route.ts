import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PLANS } from "@/lib/plans";
import { createTransaction } from "@/lib/wompi";
import { sendPaymentFailedEmail, sendRenewalReminderEmail } from "@/lib/email";

const REMINDER_DAYS_BEFORE = 3;

/**
 * Wompi no renueva suscripciones por sí solo: este endpoint lo debe llamar
 * un cron externo (Render Cron Job) una vez al día. Primero avisa por
 * correo a quienes se les renueva pronto (REMINDER_DAYS_BEFORE), luego
 * cobra a cada licencia ACTIVE cuyo período ya venció, usando la fuente de
 * pago tokenizada en el checkout original. El webhook de Wompi confirma el
 * resultado final; aquí solo disparamos el cobro y dejamos un estado
 * optimista/pesimista inmediato para que /validate reaccione sin esperar
 * al webhook.
 */
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const now = new Date();
  const reminded = await sendUpcomingRenewalReminders(now);

  const dueLicenses = await prisma.license.findMany({
    where: {
      status: "ACTIVE",
      wompiPaymentSourceId: { not: null },
      currentPeriodEnd: { lte: now },
      OR: [{ lastChargeAttemptAt: null }, { lastChargeAttemptAt: { lt: startOfToday(now) } }],
    },
  });

  const results: { email: string; outcome: string }[] = [];

  for (const license of dueLicenses) {
    const plan = PLANS[license.plan ?? "MONTHLY"];
    const reference = `renew-${license.id}-${now.getTime()}`;

    await prisma.license.update({
      where: { id: license.id },
      data: { lastChargeAttemptAt: now },
    });

    try {
      const transaction = await createTransaction({
        amountInCents: plan.priceCop * 100,
        customerEmail: license.email,
        reference,
        paymentSourceId: Number(license.wompiPaymentSourceId),
      });

      const periodMs = plan.id === "ANNUAL" ? 366 * 24 * 60 * 60 * 1000 : 31 * 24 * 60 * 60 * 1000;

      if (transaction.status === "APPROVED") {
        await prisma.license.update({
          where: { id: license.id },
          data: {
            status: "ACTIVE",
            currentPeriodEnd: new Date(Date.now() + periodMs),
            wompiLastTransactionId: transaction.id,
            // Nuevo período: el próximo aviso de renovación debe poder
            // enviarse de nuevo cuando ese período esté por vencer.
            renewalReminderSentAt: null,
          },
        });
        results.push({ email: license.email, outcome: "APPROVED" });
      } else {
        await prisma.license.update({
          where: { id: license.id },
          data: { status: "PAST_DUE", wompiLastTransactionId: transaction.id },
        });
        await sendPaymentFailedEmail({ email: license.email, name: license.name });
        results.push({ email: license.email, outcome: transaction.status });
      }
    } catch (err) {
      console.error(`[cron renew-licenses] Falló el cobro de ${license.email}:`, err);
      await prisma.license.update({ where: { id: license.id }, data: { status: "PAST_DUE" } });
      await sendPaymentFailedEmail({ email: license.email, name: license.name }).catch(() => {});
      results.push({ email: license.email, outcome: "ERROR" });
    }
  }

  return NextResponse.json({ ok: true, reminded, processed: results.length, results });
}

function startOfToday(now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

async function sendUpcomingRenewalReminders(now: Date): Promise<number> {
  const reminderWindowEnd = new Date(now.getTime() + REMINDER_DAYS_BEFORE * 24 * 60 * 60 * 1000);

  const upcoming = await prisma.license.findMany({
    where: {
      status: "ACTIVE",
      wompiPaymentSourceId: { not: null },
      currentPeriodEnd: { gt: now, lte: reminderWindowEnd },
      renewalReminderSentAt: null,
    },
  });

  for (const license of upcoming) {
    const plan = PLANS[license.plan ?? "MONTHLY"];
    try {
      await sendRenewalReminderEmail({
        email: license.email,
        name: license.name,
        renewsAt: license.currentPeriodEnd!,
        priceCop: plan.priceCop,
      });
      await prisma.license.update({
        where: { id: license.id },
        data: { renewalReminderSentAt: now },
      });
    } catch (err) {
      console.error(`[cron renew-licenses] Falló el aviso de renovación de ${license.email}:`, err);
    }
  }

  return upcoming.length;
}
