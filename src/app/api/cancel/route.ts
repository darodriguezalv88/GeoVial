import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyLicenseAction } from "@/lib/license-links";

export async function POST(req: NextRequest) {
  const { licenseId, signature } = await req.json().catch(() => ({}));

  if (!licenseId || !signature || !verifyLicenseAction(licenseId, signature)) {
    return NextResponse.json({ error: "Enlace inválido o vencido." }, { status: 401 });
  }

  const license = await prisma.license.findUnique({ where: { id: licenseId } });
  if (!license) {
    return NextResponse.json({ error: "Licencia no encontrada." }, { status: 404 });
  }

  if (license.status === "CANCELED" || license.status === "EXPIRED") {
    return NextResponse.json({ ok: true, alreadyCanceled: true });
  }

  await prisma.license.update({ where: { id: licenseId }, data: { status: "CANCELED" } });

  return NextResponse.json({ ok: true });
}
