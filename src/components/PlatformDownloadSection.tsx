"use client";

import { useState } from "react";
import { IconCheck } from "@/components/icons";
import DownloadForm from "@/components/DownloadForm";

type PlatformKey = "ARCGIS" | "QGIS";

const PRODUCTS: Record<
  PlatformKey,
  {
    label: string;
    fileName: string;
    fileUrl: string;
    version: string;
    compat: string;
    requisitos: string[];
    pasos: { title: string; description: string }[];
    locked?: boolean;
  }
> = {
  ARCGIS: {
    label: "ArcGIS Pro",
    fileName: "GeoVial.esriAddinX",
    fileUrl: "/downloads/GeoVial.esriAddinX",
    version: "v1.0",
    compat: "Compatible con ArcGIS Pro 3.x · Windows 64-bit",
    requisitos: [
      "ArcGIS Pro 3.x instalado.",
      "Windows 10/11 de 64 bits.",
      "Conexión a internet para descargar imágenes satelitales (Landsat, Sentinel-2, DEM).",
    ],
    pasos: [
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
    ],
  },
  QGIS: {
    label: "QGIS",
    fileName: "GeoVial-QGIS.zip",
    fileUrl: "/downloads/GeoVial-QGIS.zip",
    version: "v0.1",
    compat: "Compatible con QGIS 3.28+ (probado en 3.44 LTR) · Windows 64-bit",
    locked: true,
    requisitos: [
      "QGIS 3.28 o superior instalado (recomendado: 3.44 LTR).",
      "Windows 10/11 de 64 bits.",
      "Conexión a internet para descargar imágenes satelitales (Landsat, Sentinel-2, DEM).",
    ],
    pasos: [
      {
        title: "Descarga el archivo .zip",
        description: "No lo descomprimas — QGIS lo instala directamente en formato ZIP.",
      },
      {
        title: "Abre QGIS → Complementos → Administrar e instalar complementos…",
        description: "En el panel izquierdo elige la opción \"Instalar desde ZIP\".",
      },
      {
        title: "Selecciona el archivo descargado y haz clic en \"Instalar complemento\"",
        description: "QGIS lo instala y lo deja activado automáticamente.",
      },
      {
        title: "Busca el ícono verde \"GeoVial\" en la barra de herramientas",
        description: "Ábrelo para ver el panel con todas las herramientas, con 3 días de prueba.",
      },
    ],
  },
};

export default function PlatformDownloadSection() {
  const [platform, setPlatform] = useState<PlatformKey>("ARCGIS");
  const [downloaded, setDownloaded] = useState<Set<PlatformKey>>(new Set());
  const product = PRODUCTS[platform];

  return (
    <>
      <div className="mt-[34px] flex gap-2 rounded-xl border border-slate-200 bg-slate-100 p-1.5">
        {(Object.keys(PRODUCTS) as PlatformKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setPlatform(key)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              platform === key
                ? "bg-white text-navy-700 shadow-sm"
                : "text-slate-500 hover:text-navy-700"
            }`}
          >
            {PRODUCTS[key].label}
            {downloaded.has(key) && <IconCheck className="ml-1.5 inline h-4 w-4 text-green-600" />}
          </button>
        ))}
      </div>

      <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200 border-t-[3px] border-t-blue-600 bg-white p-7 shadow-md">
        <div className="mb-2 flex items-center gap-2.5">
          <span className="font-mono text-[17px] font-medium text-navy-700">{product.fileName}</span>
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11.5px] font-semibold text-green-700">
            {product.version}
          </span>
        </div>
        <p className="mb-5 text-sm text-slate-500">Última versión · {product.compat}</p>
        {product.locked ? (
          <button
            disabled
            title="Estamos validando las herramientas antes de publicarlo."
            className="w-full cursor-not-allowed rounded-md bg-slate-200 px-6 py-3.5 text-base font-semibold text-slate-500"
          >
            Próximamente
          </button>
        ) : (
          <DownloadForm
            key={platform}
            product={platform}
            fileUrl={product.fileUrl}
            onDownloaded={() => setDownloaded((prev) => new Set(prev).add(platform))}
          />
        )}
      </div>

      <section className="mt-[52px]">
        <h2 className="mb-[18px] font-display text-2xl font-semibold tracking-tight text-navy-700">
          Requisitos ({product.label})
        </h2>
        <div className="flex flex-col gap-3">
          {product.requisitos.map((req) => (
            <div key={req} className="flex items-start gap-3">
              <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <span className="text-base text-slate-800">{req}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[52px]">
        <h2 className="mb-[22px] font-display text-2xl font-semibold tracking-tight text-navy-700">
          Cómo instalar en {product.label}
        </h2>
        <ol className="flex flex-col gap-5">
          {product.pasos.map((paso, index) => (
            <li key={paso.title} className="flex gap-4">
              <div
                className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold text-white ${
                  index === product.pasos.length - 1 ? "bg-green-600" : "bg-navy-700"
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
    </>
  );
}
