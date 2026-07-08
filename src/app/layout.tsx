import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "GeoVial — Add-in de ArcGIS Pro para corredores viales",
  description:
    "GeoVial es un add-in para ArcGIS Pro que automatiza estudios de prefactibilidad y diseño de corredores viales: imágenes satelitales, índices espectrales, cuerpos de agua, drenajes, puentes y cruces con redes existentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[#f5f8fa] font-text text-slate-800">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      </body>
    </html>
  );
}
