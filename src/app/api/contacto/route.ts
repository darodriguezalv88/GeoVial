import { NextRequest, NextResponse } from "next/server";
import { sendQuoteRequestEmail, type QuoteRequestSource } from "@/lib/email";

const VALID_SOURCES: QuoteRequestSource[] = ["cotizacion", "contacto"];

export async function POST(req: NextRequest) {
  let body: {
    nombre?: string;
    correo?: string;
    telefono?: string;
    asunto?: string;
    mensaje?: string;
    source?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la petición inválido, se esperaba JSON." }, { status: 400 });
  }

  const nombre = body.nombre?.trim();
  const correo = body.correo?.trim().toLowerCase();
  const telefono = body.telefono?.trim() || null;
  const asunto = body.asunto?.trim();
  const mensaje = body.mensaje?.trim();
  const source: QuoteRequestSource = VALID_SOURCES.includes(body.source as QuoteRequestSource)
    ? (body.source as QuoteRequestSource)
    : "cotizacion";

  if (!nombre || !correo || !asunto || !mensaje) {
    return NextResponse.json(
      { error: "Nombre, correo, asunto y mensaje son obligatorios." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return NextResponse.json({ error: "El correo no es válido." }, { status: 400 });
  }

  try {
    await sendQuoteRequestEmail({ nombre, correo, telefono, asunto, mensaje, source });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/contacto]", err);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Intenta de nuevo en un momento." },
      { status: 500 }
    );
  }
}
