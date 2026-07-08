import crypto from "crypto";
import type { Plan } from "@prisma/client";

/**
 * Verifica la firma HMAC-SHA256 que Lemon Squeezy manda en el header
 * `X-Signature` de cada webhook, calculada sobre el cuerpo crudo (sin
 * parsear) de la petición. Debe compararse con timingSafeEqual para no
 * filtrar el secreto por temporización.
 */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret || !signatureHeader) return false;

  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  const expected = Buffer.from(digest, "utf8");
  const received = Buffer.from(signatureHeader, "utf8");
  if (expected.length !== received.length) return false;

  return crypto.timingSafeEqual(expected, received);
}

/** Mapea el variantId de Lemon Squeezy (de cada evento de webhook) a nuestro enum Plan. */
export function planFromVariantId(variantId: string | number): Plan | null {
  const id = String(variantId);
  if (id === process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_MONTHLY) return "MONTHLY";
  if (id === process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ANNUAL) return "ANNUAL";
  return null;
}

/** Estados de suscripción de Lemon Squeezy que consideramos "licencia activa". */
const ACTIVE_LS_STATUSES = new Set(["active", "on_trial"]);

/** Mapea el status de suscripción de Lemon Squeezy a nuestro enum LicenseStatus. */
export function licenseStatusFromSubscriptionStatus(
  lsStatus: string
): "ACTIVE" | "PAST_DUE" | "CANCELED" | "EXPIRED" {
  if (ACTIVE_LS_STATUSES.has(lsStatus)) return "ACTIVE";
  if (lsStatus === "past_due" || lsStatus === "unpaid") return "PAST_DUE";
  if (lsStatus === "cancelled") return "CANCELED";
  // "expired" y cualquier otro estado no reconocido caen aquí por seguridad.
  return "EXPIRED";
}
