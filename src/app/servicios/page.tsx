import Link from "next/link";
import {
  IconWater,
  IconCulvert,
  IconBridge,
  IconNetwork,
  IconChart,
  IconLayers,
  IconDrone,
  IconShield,
  IconMcp,
  IconPointCloud,
  IconMesh,
  IconMail,
} from "@/components/icons";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Servicios — Ingeniería en Hidrología, Hidráulica y SIG · GeoVial",
  description:
    "Estudios y diseños hidrológicos e hidráulicos, drenaje vial y urbano, redes de acueducto y alcantarillado, análisis geoespacial con SIG y levantamientos fotogramétricos con dron.",
};

const servicios = [
  {
    icon: IconWater,
    title: "Estudios hidrológicos e hidráulicos",
    description:
      "Caracterización climatológica, estimación de caudales de diseño y niveles máximos de inundación con HEC-HMS, HEC-RAS, SWMM y Epanet.",
  },
  {
    icon: IconCulvert,
    title: "Drenaje vial y urbano",
    description:
      "Diseño de cunetas, alcantarillas y subdrenaje para corredores viales y férreos, de prefactibilidad a diseño de detalle.",
  },
  {
    icon: IconNetwork,
    title: "Redes de acueducto y alcantarillado",
    description:
      "Diagnóstico, diseño y modelación de sistemas de acueducto, alcantarillado sanitario y pluvial con WaterGEMS y SewerGEMS.",
  },
  {
    icon: IconBridge,
    title: "Socavación y estructuras hidráulicas",
    description:
      "Modelación matemática de estructuras de paso sobre cauces y análisis de socavación para puentes y obras de cruce.",
  },
  {
    icon: IconLayers,
    title: "Análisis geoespacial con SIG",
    description:
      "Procesamiento de cartografía, imágenes satelitales, índices espectrales y modelos de elevación con ArcGIS y QGIS.",
  },
  {
    icon: IconShield,
    title: "Gestión del riesgo de desastres",
    description:
      "Análisis técnicos de condiciones de riesgo, obras de emergencia y conceptos técnicos para atención de desastres.",
  },
  {
    icon: IconChart,
    title: "Interventoría y supervisión técnica",
    description:
      "Seguimiento técnico, administrativo y financiero de contratos de consultoría, interventoría y construcción de obra.",
  },
  {
    icon: IconDrone,
    title: "Levantamientos con dron",
    description:
      "Vuelos fotogramétricos para ortomosaicos, modelos de elevación y nubes de puntos con precisión centimétrica.",
  },
] as const;

const metodologia = [
  {
    n: "01",
    title: "Diagnóstico y recopilación",
    description:
      "Revisión de información existente, cartografía, hidrología regional y visita o vuelo de reconocimiento del área de estudio.",
    color: "var(--color-blue-600)",
  },
  {
    n: "02",
    title: "Modelación hidrológica e hidráulica",
    description:
      "Estimación de caudales de diseño y modelación con software especializado (HEC-HMS, HEC-RAS, SWMM, WaterGEMS, SewerGEMS, Epanet).",
    color: "var(--color-blue-500)",
  },
  {
    n: "03",
    title: "Diseño y dimensionamiento",
    description: "Dimensionamiento de obras de drenaje, redes o estructuras hidráulicas según la normativa vigente.",
    color: "var(--color-green-500)",
  },
  {
    n: "04",
    title: "Memorias, planos y entrega",
    description: "Memorias de cálculo, planos de diseño, especificaciones técnicas y apoyo en comités de seguimiento.",
    color: "var(--color-green-600)",
  },
];

const flujoDron = [
  {
    n: "01",
    title: "Captura con dron",
    description:
      "Vuelo fotogramétrico con puntos de control en campo (GCP) sobre el cauce, la planicie de inundación o el corredor vial.",
    color: "var(--color-blue-600)",
  },
  {
    n: "02",
    title: "Modelo de terreno de alta resolución",
    description:
      "Procesamiento hasta un DEM/DTM con precisión centimétrica: la geometría real del cauce y del corredor, no un supuesto.",
    color: "var(--color-blue-500)",
  },
  {
    n: "03",
    title: "Modelación 1D/2D y drenaje vial",
    description:
      "Ese DEM alimenta las secciones y la malla del cauce en HEC-RAS (1D y 2D) y las superficies de diseño de cunetas y obras de drenaje vial.",
    color: "var(--color-green-500)",
  },
];

const entregablesDron = [
  {
    icon: IconLayers,
    title: "Ortomosaico",
    description: "Imagen aérea georreferenciada y sin distorsión del cauce o corredor, en alta resolución.",
    spec: "GSD ~2 cm/px",
    specColor: "blue",
  },
  {
    icon: IconLayers,
    title: "DEM / DTM",
    description:
      "Geometría de cauces para modelación 1D/2D en HEC-RAS y superficie base para el diseño de drenaje vial.",
    spec: "Precisión ± 3 cm",
    specColor: "green",
  },
  {
    icon: IconPointCloud,
    title: "Nube de puntos",
    description: "Nube densificada (LAS/LAZ) para secciones transversales del cauce y verificación de cotas.",
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
          <div className="max-w-[58ch]">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#7FE0A0]">
              Servicios
            </p>
            <h1 className="font-display text-[42px] font-bold leading-[1.1] tracking-tight text-white">
              Ingeniería en hidrología, hidráulica y SIG
            </h1>
            <p className="mt-[18px] text-lg leading-[1.55] text-[#C7D4E4]">
              Estudios y diseños hidrológicos e hidráulicos, drenaje vial y urbano, redes de
              acueducto y alcantarillado, y análisis geoespacial con SIG — para
              infraestructura vial, urbana y aeroportuaria, con más de trece años de
              experiencia.
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
                href="/geovial-addin"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-navy-700 transition-colors hover:bg-slate-100"
              >
                Conocer GeoVial Addin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Líneas de servicio ---------------- */}
      <section className="mx-auto max-w-[1160px] px-6 py-20">
        <div className="mb-11 max-w-[52ch]">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
            Líneas de servicio
          </p>
          <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-navy-700">
            Un mismo criterio de territorio, en cada frente
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s, i) => (
            <div
              key={s.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="absolute right-5 top-[18px] font-mono text-xs text-slate-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-[10px] bg-blue-100 text-blue-600">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1.5 font-display text-[16.5px] font-semibold text-navy-700">{s.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{s.description}</p>
            </div>
          ))}

          {/* 09 · Automatización — cajetín destacado, ocupa el ancho de las 4 columnas */}
          <div
            className="relative overflow-hidden rounded-2xl border p-6 shadow-md sm:col-span-2 lg:col-span-4"
            style={{ backgroundImage: "var(--grad-field)", borderColor: "var(--border-on-dark)" }}
          >
            <span className="absolute right-6 top-5 font-mono text-xs text-white/30">09</span>
            <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[auto_1fr_auto]">
              <div className="inline-grid h-11 w-11 place-items-center rounded-[10px] bg-[rgba(70,169,78,0.18)] text-[#7FE0A0]">
                <IconMcp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1.5 font-display text-[16.5px] font-semibold text-[#EAF1F8]">
                  Automatización de flujos de trabajo
                </h3>
                <p className="text-sm leading-relaxed text-[#9DB0C6]">
                  Automatizamos tareas repetitivas de tu flujo de trabajo en SIG con
                  geoprocesos a la medida e integraciones con IA — la primera ya es un
                  producto completo:{" "}
                  <Link href="/geovial-addin" className="text-[#7FE0A0] underline underline-offset-2">
                    GeoVial Addin
                  </Link>
                  , disponible hoy para ArcGIS Pro y QGIS con 3 días de prueba gratuita.
                </p>
              </div>
              <Link
                href="/geovial-addin"
                className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-white px-5 py-3 text-sm font-semibold text-navy-700 shadow-sm transition-colors hover:bg-slate-100"
              >
                Conocer GeoVial Addin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Metodología ---------------- */}
      <section className="border-t border-slate-200 bg-[#f5f8fa]">
        <div className="mx-auto max-w-[1160px] px-6 py-20">
          <div className="mb-10 max-w-[52ch]">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
              Metodología
            </p>
            <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-navy-700">
              De la información al diseño de detalle
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </section>

      {/* ---------------- Levantamientos con dron ---------------- */}
      <section className="mx-auto max-w-[1160px] px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[62ch]">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
              Levantamientos con dron
            </p>
            <h2 className="font-display text-[30px] font-semibold leading-[1.15] tracking-tight text-navy-700">
              El modelo de terreno que alimenta tu modelación hidráulica
            </h2>
            <p className="mt-3.5 text-[16.5px] leading-[1.55] text-slate-800">
              El dron no es un servicio aparte: es el punto de partida. Cada vuelo entrega
              un modelo de terreno de precisión centimétrica que se convierte directamente
              en la geometría de cauces para modelación 1D y 2D en HEC-RAS, y en la
              superficie base para el diseño de drenaje vial — complementando hidrología e
              hidráulica, drenaje vial y socavación con datos reales del territorio, no con
              supuestos.
            </p>
          </div>
          <IconDrone className="h-11 w-11 shrink-0 text-blue-600" />
        </div>

        <div className="mb-12 grid grid-cols-1 gap-7 sm:grid-cols-3">
          {flujoDron.map((step) => (
            <div key={step.n} className="border-t-2 pt-5" style={{ borderColor: step.color }}>
              <span className="font-mono text-[13px] font-semibold" style={{ color: step.color }}>
                {step.n}
              </span>
              <h3 className="mb-1.5 mt-3.5 font-display text-lg font-semibold text-navy-700">{step.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-slate-500">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {entregablesDron.map((item) => (
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
      </section>

      {/* ---------------- CTA / Formulario de cotización ---------------- */}
      <section id="cotizar" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[600px] px-6 py-[68px]">
          <div className="mx-auto mb-6 h-1 w-14 rounded-full" style={{ backgroundImage: "var(--grad-rule)" }} />
          <h2 className="mx-auto max-w-[24ch] text-center font-display text-[30px] font-bold leading-[1.15] tracking-tight text-navy-700">
            ¿Necesitas un estudio o diseño para tu proyecto?
          </h2>
          <p className="mx-auto mt-3.5 max-w-[50ch] text-center text-base leading-[1.55] text-slate-800">
            Cuéntanos el alcance y ubicación del proyecto y te enviamos una cotización con
            tiempos de entrega.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
            <QuoteForm source="cotizacion" />
          </div>
        </div>
      </section>
    </div>
  );
}
