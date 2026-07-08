import Link from "next/link";
import { IconCheck } from "@/components/icons";
import DownloadForm from "@/components/DownloadForm";

export const metadata = {
  title: "Descarga — GeoVial",
  description: "Descarga el add-in de GeoVial para ArcGIS Pro e instrucciones de instalación.",
};

const requisitos = [
  "ArcGIS Pro 3.x instalado.",
  "Windows 10/11 de 64 bits.",
  "Conexión a internet para descargar imágenes satelitales (Landsat, Sentinel-2, DEM).",
];

const pasos = [
  {
    title: "Descarga el archivo .esriAddinX",
    description: "Pesa pocos megabytes y no requiere ningún instalador adicional.",
  },
  {
    title: "Cierra ArcGIS Pro (si está abierto)",
    description: "Para que la instalación se complete sin conflictos, cierra cualquier sesión abierta.",
  },
  {
    title: "Haz doble clic en el archivo descargado",
    description:
      "Windows abrirá el instalador de complementos de ArcGIS Pro automáticamente. Sin permisos de administrador.",
  },
  {
    title: "Confirma la instalación",
    description: "Acepta la instalación en el cuadro de diálogo. El add-in queda disponible al abrir ArcGIS Pro.",
  },
  {
    title: "Abre ArcGIS Pro y busca la pestaña GeoVial",
    description: "Verás una nueva pestaña en la cinta con todas las herramientas listas, con 3 días de prueba.",
  },
];

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
        Instala el add-in en ArcGIS Pro en menos de un minuto. Sin instaladores complejos,
        sin permisos de administrador.
      </p>

      <div className="relative mt-[34px] overflow-hidden rounded-2xl border border-slate-200 border-t-[3px] border-t-blue-600 bg-white p-7 shadow-md">
        <div className="mb-2 flex items-center gap-2.5">
          <span className="font-mono text-[17px] font-medium text-navy-700">GeoVial.esriAddinX</span>
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11.5px] font-semibold text-green-700">
            v1.0
          </span>
        </div>
        <p className="mb-5 text-sm text-slate-500">
          Última versión · Compatible con ArcGIS Pro 3.x · Windows 64-bit
        </p>
        <DownloadForm product="ARCGIS" fileUrl="/downloads/GeoVial.esriAddinX" />
      </div>

      <section className="mt-[52px]">
        <h2 className="mb-[18px] font-display text-2xl font-semibold tracking-tight text-navy-700">
          Requisitos
        </h2>
        <div className="flex flex-col gap-3">
          {requisitos.map((req) => (
            <div key={req} className="flex items-start gap-3">
              <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <span className="text-base text-slate-800">{req}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[52px]">
        <h2 className="mb-[22px] font-display text-2xl font-semibold tracking-tight text-navy-700">
          Cómo instalar
        </h2>
        <ol className="flex flex-col gap-5">
          {pasos.map((paso, index) => (
            <li key={paso.title} className="flex gap-4">
              <div
                className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold text-white ${
                  index === pasos.length - 1 ? "bg-green-600" : "bg-navy-700"
                }`}
              >
                {index + 1}
              </div>
              <div>
                <h3 className="mb-1 font-display text-[16.5px] font-semibold text-navy-700">{paso.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{paso.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

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
