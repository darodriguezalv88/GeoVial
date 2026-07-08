import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUniqueLicenseKey } from "@/lib/license";
import { jsonCors, corsPreflight } from "@/lib/cors";

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: NextRequest) {
  let body: { email?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return jsonCors({ error: "Cuerpo de la petición inválido, se esperaba JSON." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim() || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonCors({ error: "El email no es válido." }, { status: 400 });
  }

  try {
    // Si el email ya está en lista de espera, no se genera nada nuevo.
    const existing = await prisma.license.findUnique({ where: { email } });

    if (existing) {
      return jsonCors({ waitlisted: true, reused: true });
    }

    // Genera y guarda la clave ya mismo (oculta): cuando la persona compre
    // un plan, el webhook de Lemon Squeezy la activa sin generar una nueva.
    const key = await generateUniqueLicenseKey();

    await prisma.license.create({
      data: { email, name, key },
    });

    return jsonCors({ waitlisted: true, reused: false });
  } catch (err) {
    console.error("[POST /api/license/request]", err);
    return jsonCors({ error: "Error interno al generar la licencia." }, { status: 500 });
  }
}
