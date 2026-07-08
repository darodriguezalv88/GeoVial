import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/:path*",
};

/**
 * El sitio se sirve desde Render (geovialpro.com); Vercel se mantiene solo
 * como alias legado para no romper enlaces viejos ya compartidos
 * (geovialweb.vercel.app). Esta condición nunca es cierta en Render, así
 * que este redirect no le afecta.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (host.endsWith(".vercel.app")) {
    const url = new URL(req.nextUrl.pathname + req.nextUrl.search, "https://geovialpro.com");
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}
