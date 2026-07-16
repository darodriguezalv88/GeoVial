import crypto from "crypto";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
const PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY;

// La llave (test/prod) determina el ambiente; así no hay que tocar código
// al pasar de Sandbox a producción, solo las variables de entorno.
const WOMPI_API_BASE = PUBLIC_KEY?.startsWith("pub_prod_")
  ? "https://production.wompi.co/v1"
  : "https://sandbox.wompi.co/v1";

type AcceptanceTokens = {
  acceptanceToken: string;
  acceptPersonalAuth: string;
};

/**
 * Trae los tokens de aceptación (política de privacidad y tratamiento de
 * datos) que Wompi exige adjuntar a cada payment_source/transacción. Se
 * consultan con la llave pública, no requieren autenticación de comercio.
 */
export async function getAcceptanceTokens(): Promise<AcceptanceTokens> {
  if (!PUBLIC_KEY) throw new Error("NEXT_PUBLIC_WOMPI_PUBLIC_KEY no configurada");

  const res = await fetch(`${WOMPI_API_BASE}/merchants/${PUBLIC_KEY}`);
  if (!res.ok) throw new Error(`Wompi merchants error: ${res.status}`);

  const json = await res.json();
  return {
    acceptanceToken: json.data.presigned_acceptance.acceptance_token,
    acceptPersonalAuth: json.data.presigned_personal_data_auth.acceptance_token,
  };
}

type PaymentSourceParams = {
  cardToken: string;
  customerEmail: string;
  acceptanceToken: string;
  acceptPersonalAuth: string;
};

/**
 * Crea una fuente de pago (tarjeta tokenizada asociada a nuestro comercio)
 * que luego se reutiliza para cobrar renovaciones sin que el cliente vuelva
 * a ingresar sus datos. Requiere la llave privada (server-side only).
 */
export async function createPaymentSource(params: PaymentSourceParams): Promise<{ id: number }> {
  if (!PRIVATE_KEY) throw new Error("WOMPI_PRIVATE_KEY no configurada");

  const res = await fetch(`${WOMPI_API_BASE}/payment_sources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PRIVATE_KEY}`,
    },
    body: JSON.stringify({
      type: "CARD",
      token: params.cardToken,
      customer_email: params.customerEmail,
      acceptance_token: params.acceptanceToken,
      accept_personal_auth: params.acceptPersonalAuth,
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`Wompi payment_sources error: ${JSON.stringify(json)}`);

  return { id: json.data.id };
}

type ChargeParams = {
  amountInCents: number;
  customerEmail: string;
  reference: string;
  paymentSourceId: number;
};

/**
 * Cobra contra una fuente de pago ya creada (compra inicial o renovación).
 * `reference` debe ser única por intento de cobro para que Wompi no lo
 * trate como duplicado.
 */
export async function createTransaction(params: ChargeParams): Promise<{
  id: string;
  status: string;
}> {
  if (!PRIVATE_KEY) throw new Error("WOMPI_PRIVATE_KEY no configurada");

  const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;
  if (!integritySecret) throw new Error("WOMPI_INTEGRITY_SECRET no configurada");

  // Firma de integridad: SHA256 plano de referencia+monto+moneda+secreto,
  // en ese orden exacto, sin separadores. Evita que alguien manipule el
  // monto entre el navegador y Wompi.
  const signature = crypto
    .createHash("sha256")
    .update(`${params.reference}${params.amountInCents}COP${integritySecret}`)
    .digest("hex");

  const res = await fetch(`${WOMPI_API_BASE}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PRIVATE_KEY}`,
    },
    body: JSON.stringify({
      amount_in_cents: params.amountInCents,
      currency: "COP",
      customer_email: params.customerEmail,
      reference: params.reference,
      payment_source_id: params.paymentSourceId,
      signature,
      // Sin financiación: siempre 1 sola cuota (pago de contado).
      payment_method: { installments: 1 },
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`Wompi transactions error: ${JSON.stringify(json)}`);

  return { id: json.data.id, status: json.data.status };
}

/**
 * Verifica la firma SHA256 de un evento de webhook: hash de las
 * propiedades indicadas en `signature.properties` (leídas del propio
 * payload, concatenadas en orden) + timestamp + secreto de eventos.
 */
export function verifyWebhookSignature(payload: {
  data: Record<string, unknown>;
  signature: { checksum: string; properties: string[] };
  timestamp: number;
}): boolean {
  const secret = process.env.WOMPI_EVENTS_SECRET;
  if (!secret) return false;

  const concatenated = payload.signature.properties
    .map((path) => getByPath(payload.data, path))
    .join("");

  const toHash = `${concatenated}${payload.timestamp}${secret}`;
  const digest = crypto.createHash("sha256").update(toHash).digest("hex").toUpperCase();

  const expected = Buffer.from(digest, "utf8");
  const received = Buffer.from(payload.signature.checksum.toUpperCase(), "utf8");
  if (expected.length !== received.length) return false;

  return crypto.timingSafeEqual(expected, received);
}

function getByPath(obj: Record<string, unknown>, path: string): string {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
  return String(value ?? "");
}

/** Mapea el status de una transacción de Wompi a nuestro enum LicenseStatus. */
export function licenseStatusFromTransactionStatus(
  wompiStatus: string
): "ACTIVE" | "PAST_DUE" {
  return wompiStatus === "APPROVED" ? "ACTIVE" : "PAST_DUE";
}
