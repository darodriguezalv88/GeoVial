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
    const license = await prisma.license.findUnique({
      where: { key },
      include: { activations: true },
    });

    if (!license) {
      return jsonCors({ error: "La licencia no existe." }, { status: 404 });
    }

    if (!isLicenseCurrentlyValid(license)) {
      return jsonCors(
        {
          error:
            "Esta licencia no tiene un plan activo. Compra un plan mensual o anual en geovial.com/precios para activarla.",
        },
        { status: 402 }
      );
    }

    const activationForThisMachine = license.activations.find(
      (a) => a.machineId === machineId
    );

    if (activationForThisMachine) {
      // Ya estaba activada en este dispositivo: solo actualiza lastSeenAt.
      await prisma.activation.update({
        where: { id: activationForThisMachine.id },
        data: { lastSeenAt: new Date() },
      });
      return jsonCors({ ok: true, licensedTo: license.name || license.email });
    }

    // Límite de 1 dispositivo por licencia: si ya hay una activación
    // con un machineId distinto, se rechaza.
    if (license.activations.length > 0) {
      return jsonCors(
        {
          error:
            "Esta licencia ya está activada en otro dispositivo. El plan gratuito permite un único dispositivo por licencia.",
        },
        { status: 409 }
      );
    }

    await prisma.activation.create({
      data: { licenseId: license.id, machineId },
    });

    return jsonCors({ ok: true, licensedTo: license.name || license.email });
  } catch (err) {
    console.error("[POST /api/license/activate]", err);
    return jsonCors({ error: "Error interno al activar la licencia." }, { status: 500 });
  }
}
