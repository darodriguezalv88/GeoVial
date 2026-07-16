import crypto from "crypto";

/**
 * Firma enlaces de "acciones de licencia" (por ahora solo cancelar) que se
 * mandan por correo, sin depender de que el cliente inicie sesión en
 * ningún lado: el link mismo prueba que viene del dueño del correo (llegó
 * a su bandeja) y la firma evita que alguien arme uno a mano para cancelar
 * la licencia de otra persona.
 */
function getSecret(): string {
  const secret = process.env.LICENSE_LINK_SECRET;
  if (!secret) throw new Error("LICENSE_LINK_SECRET no configurada");
  return secret;
}

export function signLicenseAction(licenseId: string): string {
  return crypto.createHmac("sha256", getSecret()).update(licenseId).digest("hex");
}

export function verifyLicenseAction(licenseId: string, signature: string): boolean {
  const expected = Buffer.from(signLicenseAction(licenseId), "utf8");
  const received = Buffer.from(signature, "utf8");
  if (expected.length !== received.length) return false;
  return crypto.timingSafeEqual(expected, received);
}

export function cancelUrl(licenseId: string): string {
  const base = process.env.SITE_URL || "https://geovialpro.com";
  const sig = signLicenseAction(licenseId);
  return `${base}/cancelar?license=${licenseId}&sig=${sig}`;
}
