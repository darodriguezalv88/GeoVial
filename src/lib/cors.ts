import { NextResponse } from "next/server";

/**
 * Cabeceras CORS abiertas. Estas rutas /api/license/* son consumidas por
 * el add-in de escritorio (cliente HTTP .NET fuera del navegador), no solo
 * por el propio sitio web, por eso se permite cualquier origen.
 */
export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/** Respuesta JSON con las cabeceras CORS ya aplicadas. */
export function jsonCors(body: unknown, init?: { status?: number }) {
  return NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: CORS_HEADERS,
  });
}

/** Handler estándar para las peticiones preflight OPTIONS. */
export function corsPreflight() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
