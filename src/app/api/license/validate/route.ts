import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonCors, corsPreflight } from "@/lib/cors";
import { isLicenseCurrentlyValid } from "@/lib/license";

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: NextRequest) {
  let body: { key?: string; machineId?: string };
  try {
    body = await req.json();
  } catch {
    return jsonCors({ error: "Cuerpo de la petición inválido, se esperaba JSON." }, { status: 400 });
  }

  const key = body.key?.trim();
  const machineId = body.machineId?.trim();

  if (!key || !machineId) {
    return jsonCors({ error: "Se requieren 'key' y 'machineId'." }, { status: 400 });
  }

  try {
    const activation = await prisma.activation.findFirst({
      where: { machineId, license: { key } },
      include: { license: true },
    });

    if (!activation) {
      return jsonCors({ valid: false });
    }

    return jsonCors({ valid: isLicenseCurrentlyValid(activation.license) });
  } catch (err) {
    console.error("[POST /api/license/validate]", err);
    return jsonCors({ error: "Error interno al validar la licencia." }, { status: 500 });
  }
}
