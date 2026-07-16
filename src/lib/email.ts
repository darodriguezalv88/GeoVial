import { Resend } from "resend";
import { cancelUrl } from "@/lib/license-links";

const SITE_URL = process.env.SITE_URL || "https://geovialpro.com";

/**
 * Envuelve el contenido de un correo transaccional con el mismo header
 * (wordmark GeoVial) y footer (contacto, dirección, copyright) en todos
 * lados, para que se vea como un producto con respaldo real y no un
 * correo de texto plano genérico.
 */
function emailLayout(bodyHtml: string): string {
  return `
<div style="background-color:#f5f8fa;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:520px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
    <div style="padding:28px 32px 20px;border-bottom:1px solid #e2e8f0;">
      <span style="font-size:20px;font-weight:700;">
        <span style="color:#16315a;">Geo</span><span style="color:#2570b8;">Vial</span>
      </span>
    </div>
    <div style="padding:28px 32px;color:#1e293b;font-size:15px;line-height:1.6;">
      ${bodyHtml}
    </div>
    <div style="padding:20px 32px 28px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12.5px;line-height:1.6;">
      <p style="margin:0 0 8px;">
        <a href="${SITE_URL}/contactenos" style="color:#2570b8;text-decoration:none;">¿Necesitas ayuda? Contáctenos</a>
      </p>
      <p style="margin:0 0 12px;">
        GeoVial &middot; Add-in para ArcGIS Pro y QGIS &middot; Colombia<br/>
        gerencia@geovialpro.com<br/>
        <a href="${SITE_URL}" style="color:#2570b8;text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
      </p>
      <p style="margin:0;color:#94a3b8;">© ${new Date().getFullYear()} GeoVial. Todos los derechos reservados.</p>
    </div>
  </div>
</div>`.trim();
}

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
  licenseId: string;
}): Promise<{ delivered: "log" | "resend" }> {
  const { email, name, key, licenseId } = params;
  const apiKey = process.env.RESEND_API_KEY;
  const saludo = name ? `Hola ${name},` : "Hola,";

  if (!apiKey) {
    console.log(
      `[sendLicenseEmail] (modo local, sin RESEND_API_KEY) Enviaría correo a ${email}` +
        `${name ? ` (${name})` : ""} con la clave de licencia: ${key}`
    );
    return { delivered: "log" };
  }

  const from = process.env.RESEND_FROM_EMAIL || "GeoVial <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const html = emailLayout(`
    <p style="margin:0 0 16px;">${saludo}</p>
    <p style="margin:0 0 16px;">Gracias por tu compra. Esta es tu clave de licencia de GeoVial:</p>
    <p style="margin:0 0 20px;padding:14px 18px;background-color:#f1f5f9;border-radius:8px;font-family:monospace;font-size:16px;font-weight:700;color:#16315a;letter-spacing:0.5px;">
      ${key}
    </p>
    <p style="margin:0 0 24px;">
      Actívala desde la pestaña GeoVial en ArcGIS Pro (o el panel GeoVial en QGIS), en el botón
      "Licencia". Cada licencia solo puede activarse en un dispositivo.
    </p>
    <p style="margin:0 0 24px;">
      <a href="${SITE_URL}/descarga" style="display:inline-block;background-color:#2570b8;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:6px;">
        Instalar el add-in
      </a>
    </p>
    <p style="margin:0;font-size:13px;color:#64748b;">
      <a href="${cancelUrl(licenseId)}" style="color:#64748b;text-decoration:underline;">Cancelar suscripción</a>
    </p>
  `);

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Tu clave de licencia de GeoVial",
    html,
    text:
      `${saludo}\n\n` +
      `Gracias por tu compra. Esta es tu clave de licencia de GeoVial:\n\n` +
      `${key}\n\n` +
      `Actívala desde la pestaña GeoVial en ArcGIS Pro (o el panel GeoVial en QGIS), en el botón "Licencia".\n\n` +
      `Cada licencia solo puede activarse en un dispositivo.\n\n` +
      `Instalar: ${SITE_URL}/descarga\n` +
      `Cancelar suscripción: ${cancelUrl(licenseId)}\n` +
      `Contáctenos: ${SITE_URL}/contactenos`,
  });

  if (error) {
    console.error("[sendLicenseEmail] Error al enviar con Resend:", error);
    throw new Error(`No se pudo enviar el correo con Resend: ${error.message}`);
  }

  return { delivered: "resend" };
}

/** Aviso de renovación fallida (cobro recurrente rechazado por el banco). */
export async function sendPaymentFailedEmail(params: {
  email: string;
  name?: string | null;
}): Promise<{ delivered: "log" | "resend" }> {
  const { email, name } = params;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      `[sendPaymentFailedEmail] (modo local, sin RESEND_API_KEY) Enviaría aviso de pago fallido a ${email}`
    );
    return { delivered: "log" };
  }

  const from = process.env.RESEND_FROM_EMAIL || "GeoVial <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "No pudimos procesar la renovación de tu licencia GeoVial",
    text:
      `${name ? `Hola ${name},\n\n` : "Hola,\n\n"}` +
      `Intentamos renovar tu licencia de GeoVial y el banco rechazó el cobro a tu tarjeta.\n\n` +
      `Actualiza tu método de pago desde https://geovialpro.com/precios para no perder acceso ` +
      `a las herramientas.\n\n` +
      `Si tienes dudas, responde este correo.`,
  });

  if (error) {
    console.error("[sendPaymentFailedEmail] Error al enviar con Resend:", error);
    throw new Error(`No se pudo enviar el correo con Resend: ${error.message}`);
  }

  return { delivered: "resend" };
}

/** Aviso previo a la renovación automática (unos días antes del cobro). */
export async function sendRenewalReminderEmail(params: {
  email: string;
  name?: string | null;
  renewsAt: Date;
  priceCop: number;
}): Promise<{ delivered: "log" | "resend" }> {
  const { email, name, renewsAt, priceCop } = params;
  const apiKey = process.env.RESEND_API_KEY;
  const fecha = renewsAt.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  const monto = `$${priceCop.toLocaleString("es-CO")} COP`;

  if (!apiKey) {
    console.log(
      `[sendRenewalReminderEmail] (modo local, sin RESEND_API_KEY) Enviaría aviso de renovación a ${email} (${monto}, ${fecha})`
    );
    return { delivered: "log" };
  }

  const from = process.env.RESEND_FROM_EMAIL || "GeoVial <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Tu licencia de GeoVial se renueva pronto",
    text:
      `${name ? `Hola ${name},\n\n` : "Hola,\n\n"}` +
      `Tu suscripción de GeoVial se renueva automáticamente el ${fecha} por ${monto}, ` +
      `cobrado a la misma tarjeta con la que pagaste la última vez.\n\n` +
      `Si necesitas cancelar o cambiar de método de pago, responde este correo antes de esa fecha.`,
  });

  if (error) {
    console.error("[sendRenewalReminderEmail] Error al enviar con Resend:", error);
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

/** Asunto de la confirmación que recibe quien llena el formulario (no el interno). */
const CONFIRMATION_SUBJECT = {
  cotizacion: "Recibimos tu solicitud de cotización — GeoVial",
  contacto: "Recibimos tu mensaje — GeoVial",
} as const;

/**
 * Confirmación automática a quien llenó el formulario de "Servicios"
 * (cotización) o "Contáctenos": avisa que el mensaje llegó y que le
 * responderemos pronto. Se envía además del correo interno de aviso
 * (`sendQuoteRequestEmail`), no en su lugar.
 */
export async function sendQuoteConfirmationEmail(params: {
  nombre: string;
  correo: string;
  asunto: string;
  source: QuoteRequestSource;
}): Promise<{ delivered: "log" | "resend" }> {
  const { nombre, correo, asunto, source } = params;
  const apiKey = process.env.RESEND_API_KEY;
  const primerNombre = nombre.split(" ")[0];

  if (!apiKey) {
    console.log(
      `[sendQuoteConfirmationEmail] (modo local, sin RESEND_API_KEY) Enviaría confirmación a ${correo}`
    );
    return { delivered: "log" };
  }

  const from = process.env.RESEND_FROM_EMAIL || "GeoVial <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const html = emailLayout(`
    <p style="margin:0 0 16px;">Hola ${primerNombre},</p>
    <p style="margin:0 0 16px;">
      Recibimos tu ${source === "cotizacion" ? "solicitud de cotización" : "mensaje"}
      "${asunto}". Nuestro equipo va a revisarlo y te vamos a contactar lo más pronto posible
      con el análisis correspondiente.
    </p>
    <p style="margin:0;">Si mientras tanto tienes más detalles que compartir, solo responde este correo.</p>
  `);

  const { error } = await resend.emails.send({
    from,
    to: correo,
    subject: CONFIRMATION_SUBJECT[source],
    html,
    text:
      `Hola ${primerNombre},\n\n` +
      `Recibimos tu ${source === "cotizacion" ? "solicitud de cotización" : "mensaje"} "${asunto}". ` +
      `Nuestro equipo va a revisarlo y te vamos a contactar lo más pronto posible con el análisis ` +
      `correspondiente.\n\n` +
      `Si mientras tanto tienes más detalles que compartir, solo responde este correo.`,
  });

  if (error) {
    console.error("[sendQuoteConfirmationEmail] Error al enviar con Resend:", error);
    throw new Error(`No se pudo enviar el correo con Resend: ${error.message}`);
  }

  return { delivered: "resend" };
}
