import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { DownloadProduct } from "@prisma/client";

const VALID_PRODUCTS: DownloadProduct[] = ["ARCGIS", "QGIS"];

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; product?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la petición inválido, se esperaba JSON." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const product: DownloadProduct = VALID_PRODUCTS.includes(body.product as DownloadProduct)
    ? (body.product as DownloadProduct)
    : "ARCGIS";

  if (!name || !email) {
    return NextResponse.json({ error: "Nombre y correo son obligatorios." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "El correo no es válido." }, { status: 400 });
  }

  try {
    await prisma.download.create({ data: { name, email, product } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/downloads]", err);
    return NextResponse.json({ error: "No se pudo registrar la descarga. Intenta de nuevo." }, { status: 500 });
  }
}
