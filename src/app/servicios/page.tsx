import Link from "next/link";
import {
  IconDrone,
  IconLayers,
  IconPointCloud,
  IconMesh,
  IconMail,
} from "@/components/icons";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Servicios — Levantamientos fotogramétricos con dron · GeoVial",
  description:
    "Levantamientos fotogramétricos con dron: ortomosaicos, modelos de elevación (DEM/DTM), nubes de puntos y modelos 3D listos para tu proyecto vial.",
};

const metodologia = [
  {
    n: "01",
    title: "Captura con dron",
    description:
      "Vuelo fotogramétrico planificado con traslapes óptimos y puntos de control en campo (GCP) para máxima precisión.",
    color: "var(--color-blue-600)",
  },
  {
    n: "02",
    title: "Procesamiento fotogramétrico",
    description:
      "Alineación de imágenes, densificación de nube de puntos y generación de malla — mismo flujo que Pix4Dmapper.",
    color: "var(--color-blue-500)",
  },
  {
    n: "03",
    title: "Control de calidad",
    description: "Verificación de precisión contra puntos de control y ajuste antes de entregar.",
    color: "var(--color-green-500)",
  },
  {
    n: "04",
    title: "Entrega de insumos",
    description: "DEM, ortomosaico y nube de puntos listos para importar directamente en GeoVial y ArcGIS Pro.",
    color: "var(--color-green-600)",
  },
];

const entregables = [
  {
    icon: IconLayers,
    title: "Ortomosaico",
    description: "Imagen aérea georreferenciada y sin distorsión de todo el corredor, en alta resolución.",
    spec: "GSD ~2 cm/px",
    specColor: "blue",
  },
  {
    icon: IconLayers,
    title: "DEM / DTM",
    description: "Modelo digital de elevación y de terreno, base para el diseño geométrico del corredor.",
    spec: "Precisión ± 3 cm",
    specColor: "green",
  },
  {
    icon: IconPointCloud,
    title: "Nube de puntos",
    description: "Nube de puntos densificada (LAS/LAZ) para análisis volumétrico y modelado 3D.",
    spec: "Formato LAS / LAZ",
    specColor: "blue",
  },
  {
    icon: IconMesh,
    title: "Modelo 3D / malla",
    description: "Malla texturizada del terreno y estructuras, útil para presentaciones y visualización de proyecto.",
    spec: "Formato OBJ / GLTF",
    specColor: "green",
  },
] as const;

const specColorClasses: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
};

export default function ServiciosPage() {
  return (
    <div>
      {/* ---------------- Hero ---------------- */}
      <section
        className="relative overflow-hidden border-b"
        style={{ backgroundImage: "var(--grad-field)", borderColor: "var(--border-on-dark)" }}
      >
        <div className="relative mx-auto max-w-[1160px] px-6 pb-[68px] pt-20">
          <div className="max-w-[56ch]">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#7FE0A0]">
              Servicios
            </p>
            <h1 className="font-display text-[42px] font-bold leading-[1.1] tracking-tight text-white">
              Levantamientos fotogramétricos con dron
            </h1>
            <p className="mt-[18px] text-lg leading-[1.55] text-[#C7D4E4]">
              Capturamos tu corredor o predio con dron y lo procesamos en insumos listos
              para diseño: ortomosaicos, modelos de elevación y nubes de puntos con
              precisión centimétrica — el mismo estándar de datos que usa GeoVial.
            </p>
            <div className="mt-[30px] flex flex-wrap gap-3.5">
              <a
                href="#cotizar"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <IconMail className="h-[18px] w-[18px]" />
                Solicitar cotización
              </a>
              <Link
                href="/"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-navy-700 transition-colors hover:bg-slate-100"
              >
                Conocer GeoVial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Metodología ---------------- */}
      <section className="mx-auto max-w-[1160px] px-6 pb-5 pt-20">
        <div className="mb-10 max-w-[52ch]">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
            Metodología
          </p>
          <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-navy-700">
            De vuelo a insumo de diseño
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3.5">
            <IconDrone className="h-9 w-9 shrink-0 text-blue-600" />
            <p className="text-sm leading-relaxed text-slate-500">
              Cada entrega parte de un vuelo planificado y termina en un archivo que
              importas directo a tu SIG.
            </p>
          </div>
          {metodologia.map((step) => (
            <div key={step.n} className="border-t-2 pt-5" style={{ borderColor: step.color }}>
              <span className="font-mono text-[13px] font-semibold" style={{ color: step.color }}>
                {step.n}
              </span>
              <h3 className="mb-1.5 mt-3.5 font-display text-lg font-semibold text-navy-700">{step.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-slate-500">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Entregables ---------------- */}
      <section className="mx-auto max-w-[1160px] px-6 pb-[84px] pt-[60px]">
        <div className="mb-10 max-w-[52ch]">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
            Entregables
          </p>
          <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-navy-700">
            Productos posprocesados
          </h2>
          <p className="mt-3.5 text-[17px] leading-[1.55] text-slate-800">
            Cada vuelo se entrega en los formatos estándar de la industria, listos para tu
            SIG o software de diseño.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {entregables.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex h-[120px] items-center justify-center bg-slate-100 text-slate-400">
                <item.icon className="h-10 w-10" />
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 font-display text-[16.5px] font-semibold text-navy-700">{item.title}</h3>
                <p className="mb-2.5 text-[13.5px] leading-relaxed text-slate-500">{item.description}</p>
                <span
                  className={`rounded-md px-2.5 py-1 font-mono text-[11px] ${specColorClasses[item.specColor]}`}
                >
                  {item.spec}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          ¿Ya tienes muestras propias (ortomosaico, DEM, nube de puntos)? Reemplaza estos
          bloques por tus imágenes reales en{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px]">
            public/images/servicios/
          </code>
          .
        </p>
      </section>

      {/* ---------------- CTA / Formulario de cotización ---------------- */}
      <section id="cotizar" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[600px] px-6 py-[68px]">
          <div className="mx-auto mb-6 h-1 w-14 rounded-full" style={{ backgroundImage: "var(--grad-rule)" }} />
          <h2 className="mx-auto max-w-[22ch] text-center font-display text-[30px] font-bold leading-[1.15] tracking-tight text-navy-700">
            ¿Necesitas un levantamiento para tu corredor?
          </h2>
          <p className="mx-auto mt-3.5 max-w-[50ch] text-center text-base leading-[1.55] text-slate-800">
            Cuéntanos la ubicación y extensión del proyecto y te enviamos una cotización
            con tiempos de entrega.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
            <QuoteForm source="cotizacion" />
          </div>
        </div>
      </section>
    </div>
  );
}
