import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import type { LicenseStatus } from "@prisma/client";

/**
 * Genera una clave de licencia con formato GEOVIAL-XXXX-XXXX-XXXX
 * usando caracteres alfanuméricos en mayúscula.
 */
export function generateLicenseKey(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin 0/O/1/I para evitar confusiones
  const randomBlock = () => {
    let block = "";
    const bytes = crypto.randomBytes(4);
    for (let i = 0; i < 4; i++) {
      block += alphabet[bytes[i] % alphabet.length];
    }
    return block;
  };

  return `GEOVIAL-${randomBlock()}-${randomBlock()}-${randomBlock()}`;
}

/**
 * Genera una clave y reintenta en el remotísimo caso de colisión con una
 * clave ya existente en la base de datos.
 */
export async function generateUniqueLicenseKey(): Promise<string> {
  let key = generateLicenseKey();
  for (let attempts = 0; attempts < 5; attempts++) {
    const collision = await prisma.license.findUnique({ where: { key } });
    if (!collision) break;
    key = generateLicenseKey();
  }
  return key;
}

/**
 * Si la licencia se puede usar ahora mismo. `currentPeriodEnd` es la fuente
 * de verdad (fecha hasta la que ya está pagado, la manda Lemon Squeezy vía
 * webhook): CANCELED sigue siendo válida hasta que termine el período ya
 * pagado, aunque no vaya a renovarse. EXPIRED siempre bloquea, incluso si
 * por algún motivo quedó una fecha futura guardada.
 */
export function isLicenseCurrentlyValid(license: {
  status: LicenseStatus;
  currentPeriodEnd: Date | null;
}): boolean {
  if (license.status === "EXPIRED") return false;
  if (!license.currentPeriodEnd) return false;
  return license.currentPeriodEnd.getTime() > Date.now();
}
