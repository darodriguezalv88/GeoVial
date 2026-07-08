import { Resend } from "resend";

/**
 * Envío del correo con la clave de licencia.
 *
 * Si no existe RESEND_API_KEY en el entorno (por ejemplo en desarrollo
 * local), no se envía nada de verdad: se registra en consola para poder
 * probar el flujo sin bandeja de entrada real. RESEND_FROM_EMAIL debe
 * apuntar a un dominio verificado en Resend; mientras no exista, cae al
 * remitente de pruebas de Resend (onboarding@resend.dev), que solo entrega
 * al correo con el que se creó la cuenta de Resend.
 */
export async function sendLicenseEmail(params: {
  email: string;
  name?: string | null;
  key: string;
}): Promise<{ delivered: "log" | "resend" }> {
  const { email, name, key } = params;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      `[sendLicenseEmail] (modo local, sin RESEND_API_KEY) Enviaría correo a ${email}` +
        `${name ? ` (${name})` : ""} con la clave de licencia: ${key}`
    );
    return { delivered: "log" };
  }

  const from = process.env.RESEND_FROM_EMAIL || "GeoVial <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Tu clave de licencia de GeoVial",
    text:
      `${name ? `Hola ${name},\n\n` : "Hola,\n\n"}` +
      `Gracias por tu compra. Esta es tu clave de licencia de GeoVial:\n\n` +
      `${key}\n\n` +
      `Actívala desde la pestaña GeoVial en ArcGIS Pro, en el botón "Licencia".\n\n` +
      `Cada licencia solo puede activarse en un dispositivo.`,
  });

  if (error) {
    console.error("[sendLicenseEmail] Error al enviar con Resend:", error);
    throw new Error(`No se pudo enviar el correo con Resend: ${error.message}`);
  }

  return { delivered: "resend" };
}

/** Prefijo de asunto según el formulario de origen (nunca texto libre del cliente). */
const SUBJECT_PREFIX = {
  cotizacion: "GEOVIAL - cotizacion",
  contacto: "GEOVIAL - Contactenos",
} as const;

export type QuoteRequestSource = keyof typeof SUBJECT_PREFIX;

/**
 * Envío de mensajes de los formularios de "Servicios" (cotización) y
 * "Contáctenos" al correo interno de contacto. El usuario nunca ve esa
 * dirección: solo llena nombre, correo, teléfono, asunto y mensaje, y este
 * correo llega con el remitente para responder puesto en "reply-to"
 * (responder va directo a su correo).
 */
export async function sendQuoteRequestEmail(params: {
  nombre: string;
  correo: string;
  telefono?: string | null;
  asunto: string;
  mensaje: string;
  source: QuoteRequestSource;
}): Promise<{ delivered: "log" | "resend" }> {
  const { nombre, correo, telefono, asunto, mensaje, source } = params;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || "darodriguezalv@gmail.com";
  const subject = `${SUBJECT_PREFIX[source]}: ${asunto}`;
  const body =
    `Nombre: ${nombre}\n` +
    `Correo: ${correo}\n` +
    `Teléfono: ${telefono || "(no indicado)"}\n\n` +
    `Mensaje:\n${mensaje}`;

  if (!apiKey) {
    console.log(
      `[sendQuoteRequestEmail] (modo local, sin RESEND_API_KEY) Enviaría a ${to}\n` +
        `Asunto: ${subject}\n${body}`
    );
    return { delivered: "log" };
  }

  const from = process.env.RESEND_FROM_EMAIL || "GeoVial <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: correo,
    subject,
    text: body,
  });

  if (error) {
    console.error("[sendQuoteRequestEmail] Error al enviar con Resend:", error);
    throw new Error(`No se pudo enviar el correo con Resend: ${error.message}`);
  }

  return { delivered: "resend" };
}
