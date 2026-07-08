import Link from "next/link";
import PlatformDownloadSection from "@/components/PlatformDownloadSection";

export const metadata = {
  title: "Descarga — GeoVial",
  description: "Descarga GeoVial para ArcGIS Pro o QGIS e instrucciones de instalación.",
};

export default function DescargaPage() {
  return (
    <div className="mx-auto max-w-[920px] px-6 pb-24 pt-[72px]">
      <p className="mb-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
        Instalación
      </p>
      <h1 className="font-display text-[44px] font-bold leading-[1.08] tracking-tight text-navy-700">
        Descarga GeoVial
      </h1>
      <p className="mt-4 max-w-[52ch] text-lg leading-[1.55] text-slate-800">
        Elige tu software (ArcGIS Pro o QGIS) e instala GeoVial en menos de un minuto.
        Sin instaladores complejos, sin permisos de administrador.
      </p>

      <PlatformDownloadSection />

      <div className="mt-[52px] rounded-2xl border border-slate-200 bg-slate-100 p-7">
        <h2 className="mb-2 font-display text-xl font-semibold tracking-tight text-navy-700">
          ¿Ya pasaron tus 3 días de prueba?
        </h2>
        <p className="mb-[18px] max-w-[56ch] text-[15.5px] leading-[1.55] text-slate-800">
          Elige un plan mensual o anual y recibe tu clave de licencia por correo
          para seguir usando GeoVial sin interrupciones.
        </p>
        <Link
          href="/precios"
          className="inline-block rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-slate-50"
        >
          Ver precios
        </Link>
      </div>
    </div>
  );
}
