import Image from "next/image";
import Link from "next/link";
import {
  IconSatellite,
  IconChart,
  IconWater,
  IconCulvert,
  IconBridge,
  IconNetwork,
  IconRoute,
  IconLayers,
  IconDownload,
  IconInstall,
  IconClock,
  IconKey,
} from "@/components/icons";
import McpVideoModal from "@/components/McpVideoModal";

const features = [
  {
    icon: IconSatellite,
    title: "Imágenes satelitales integradas",
    description:
      "Descarga Landsat (USGS), Sentinel-2 (Copernicus) y modelos DEM (GLO-30, SRTM) directo en ArcGIS Pro.",
    accent: "blue",
  },
  {
    icon: IconChart,
    title: "Índices espectrales y composites",
    description:
      "NDVI, BSI, NDWI y MNDWI, con composites RGB en color natural, falso color e infrarrojo (SWIR).",
    accent: "green",
  },
  {
    icon: IconWater,
    title: "Extracción de cuerpos de agua",
    description:
      "Identificación automática compatible con la metodología CORINE Land Cover para estudios ambientales.",
    accent: "blue",
  },
  {
    icon: IconCulvert,
    title: "Obras de drenaje transversal",
    description: "Calcula los cruces del eje vial con la red de drenaje para dimensionar las obras transversales.",
    accent: "blue",
  },
  {
    icon: IconBridge,
    title: "Cálculo de puentes",
    description: "Detecta los cruces del eje vial con cuerpos de agua para ubicar los puentes del corredor.",
    accent: "slate",
  },
  {
    icon: IconNetwork,
    title: "Cruces con redes existentes",
    description: "Cruces del eje con redes hidrosanitarias (HS) e hidrocarburos (HC) ya existentes en el corredor.",
    accent: "slate",
  },
  {
    icon: IconRoute,
    title: "Abscisado del eje vial",
    description: "Genera abscisas y puntos ordenados para referenciar cualquier elemento del corredor.",
    accent: "slate",
  },
  {
    icon: IconLayers,
    title: "Cartografía básica 1:25.000",
    description:
      "Descarga automática de las planchas oficiales del IGAC para tu área de estudio, con fusión de capas y relleno de vacíos con el servicio 1:100.000.",
    accent: "blue",
  },
] as const;

const steps = [
  {
    icon: IconDownload,
    title: "Descarga el add-in",
    description: "Obtén el archivo .esriAddinX desde la página de descarga.",
    color: "var(--color-blue-600)",
  },
  {
    icon: IconInstall,
    title: "Instálalo en ArcGIS Pro o QGIS",
    description: "Sin instaladores complejos, sin permisos de administrador.",
    color: "var(--color-blue-500)",
  },
  {
    icon: IconClock,
    title: "Úsalo gratis 3 días",
    description: "Prueba todas las funcionalidades sin restricciones durante el periodo de prueba.",
    color: "var(--color-green-500)",
  },
  {
    icon: IconKey,
    title: "Activa tu licencia",
    description: "Elige un plan mensual o anual y recibe tu clave de licencia por correo.",
    color: "var(--color-green-600)",
  },
];

const accentBg: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  slate: "bg-slate-100 text-slate-700",
};

export default function Home() {
  return (
    <div>
      {/* ---------------- Hero: full-bleed dusk photo, integrated (not boxed) ---------------- */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <Image
          src="/images/hero-dusk.png"
          alt="Corredor multimodal al atardecer: puente atirantado, autopista con estelas de luces, tren de carga y buque cruzando el río, con una ciudad encendiéndose al fondo"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 46%" }}
        />
        {/* legibility gradients */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(105deg, rgba(6,13,26,0.94) 0%, rgba(6,13,26,0.8) 26%, rgba(6,13,26,0.42) 52%, rgba(6,13,26,0.08) 74%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "linear-gradient(0deg, rgba(6,13,26,0.6) 0%, rgba(6,13,26,0) 30%)" }}
        />

        {/* animated light glints: cars, train, ship, city twinkle */}
        <div className="absolute inset-0 overflow-hidden">
          <span className="gv-car-glow" />
          <span className="gv-car-glow" style={{ animationDelay: "-1.6s" }} />
          <span className="gv-car-glow" style={{ animationDelay: "-2.4s" }} />
          <span className="gv-train-glow" />
          <span className="gv-ship-glow" />
          <span className="gv-twinkle" style={{ left: "31%", top: "29%" }} />
          <span className="gv-twinkle" style={{ left: "38%", top: "33%", animationDelay: "-0.6s" }} />
          <span className="gv-twinkle" style={{ left: "45%", top: "28%", animationDelay: "-1.3s" }} />
          <span className="gv-twinkle" style={{ left: "52%", top: "31%", animationDelay: "-0.3s" }} />
          <span className="gv-twinkle" style={{ left: "58%", top: "27%", animationDelay: "-1.8s" }} />
          <span className="gv-twinkle" style={{ left: "66%", top: "32%", animationDelay: "-0.9s" }} />
          <span className="gv-twinkle" style={{ left: "22%", top: "35%", animationDelay: "-2.1s" }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1160px] px-6 pb-[90px] pt-[150px]">
          <div className="max-w-[640px]">
            <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#8FE0AE]">
              GeoVial · Add-in para ArcGIS Pro 3.x
            </p>
            <h1 className="max-w-[14ch] font-display text-[50px] font-bold leading-[1.06] tracking-tight text-white text-balance">
              Estudios de corredores viales, resueltos dentro de ArcGIS&nbsp;Pro.
            </h1>
            <p className="mt-[22px] max-w-[44ch] text-lg leading-[1.55] text-[#D6E0EC]">
              Automatiza tu prefactibilidad y diseño de corredores: imágenes satelitales,
              índices espectrales, cuerpos de agua, drenajes, puentes y cruces con redes
              existentes — en tu flujo de trabajo.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-3.5">
              <Link
                href="/descarga"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <IconDownload className="h-[19px] w-[19px]" />
                Descargar GeoVial
              </Link>
              <Link
                href="/precios"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-navy-700 transition-colors hover:bg-slate-100"
              >
                Ver precios
              </Link>
            </div>
            <p className="mt-6 font-mono text-[12.5px] tracking-wide text-[#8FA3BC]">
              v1.0 · .esriAddinX · ArcGIS Pro 3.x · Windows 64-bit
            </p>
          </div>
        </div>

        <div className="absolute bottom-[22px] right-6 z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(6,13,26,0.55)] px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="font-mono text-[11px] tracking-wide text-[#EAF1F8]">
              CORREDOR MULTIMODAL · ANÁLISIS SIG
            </span>
          </span>
        </div>
      </section>

      {/* ---------------- Stats bar ---------------- */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-stretch justify-between gap-4 px-6 py-[30px]">
          {[
            ["08", "Herramientas"],
            ["04", "Fuentes de datos"],
            ["3", "Días de prueba"],
          ].map(([n, label]) => (
            <div key={label} className="flex flex-1 min-w-[190px] items-center gap-4 px-3 py-1.5">
              <div className="flex-1">
                <div className="font-display text-[34px] font-bold tracking-tight text-navy-700">{n}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-500">{label}</div>
              </div>
              <div className="h-full w-px bg-slate-200" />
            </div>
          ))}
          <div className="flex-1 min-w-[190px] px-3 py-1.5">
            <div className="font-display text-[34px] font-bold tracking-tight text-green-600">MCP</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-500">Integrado</div>
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="mx-auto max-w-[1160px] px-6 py-20">
        <div className="mb-11 max-w-[52ch]">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
            Capacidades
          </p>
          <h2 className="font-display text-[34px] font-semibold leading-[1.15] tracking-tight text-navy-700">
            Todo lo que tu corredor vial necesita
          </h2>
          <p className="mt-3.5 text-[17px] leading-[1.55] text-slate-800">
            Análisis geoespacial pensado para ingeniería vial, integrado directamente en la
            cinta de opciones de ArcGIS Pro.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="absolute right-5 top-[18px] font-mono text-xs text-slate-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={`mb-4 inline-grid h-11 w-11 place-items-center rounded-[10px] ${accentBg[feature.accent]}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1.5 font-display text-[16.5px] font-semibold text-navy-700">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{feature.description}</p>
            </div>
          ))}

          {/* Última tarjeta: MCP, destacada en oscuro — clic abre el modal del video */}
          <McpVideoModal cardNumber={features.length + 1} />
        </div>
      </section>

      {/* ---------------- Análisis geoespacial (imagen de contenido) ---------------- */}
      <section className="mx-auto max-w-[1160px] px-6 pb-[84px] pt-1">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <Image
              src="/images/gis-analisis.png"
              alt="Vista satelital del corredor con análisis geoespacial: índices de vegetación, cuerpos de agua extraídos y curvas de nivel"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3.5 left-[15px]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(12,26,48,0.72)] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="font-mono text-[11px] tracking-wide text-[#EAF1F8]">
                  NDVI · MNDWI · CURVAS DE NIVEL
                </span>
              </span>
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
              Análisis geoespacial
            </p>
            <h2 className="mb-3.5 font-display text-[30px] font-semibold leading-[1.15] tracking-tight text-navy-700">
              Del insumo satelital al criterio de diseño
            </h2>
            <p className="mb-5 max-w-[46ch] text-[16.5px] leading-[1.55] text-slate-800">
              GeoVial procesa imágenes Landsat y Sentinel-2, calcula índices espectrales y
              extrae cuerpos de agua para que cada decisión del corredor —drenajes, puentes y
              cruces— nazca de datos del territorio, no de supuestos.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-blue-100 px-2.5 py-1 font-mono text-xs text-blue-700">
                Landsat / Sentinel-2
              </span>
              <span className="rounded-md bg-blue-100 px-2.5 py-1 font-mono text-xs text-blue-700">
                NDVI · BSI · NDWI
              </span>
              <span className="rounded-md bg-green-100 px-2.5 py-1 font-mono text-xs text-green-700">
                DEM GLO-30 · SRTM
              </span>
              <span className="rounded-md bg-green-100 px-2.5 py-1 font-mono text-xs text-green-700">
                CORINE Land Cover
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MCP / Claude ---------------- */}
      <section className="relative overflow-hidden" style={{ backgroundImage: "var(--grad-field)" }}>
        <div className="relative mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-14 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#7FE0A0]">
              GIS inteligente
            </p>
            <h2 className="mb-4 max-w-[16ch] font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-white">
              Controla ArcGIS Pro conversando con Claude
            </h2>
            <p className="mb-5 max-w-[46ch] text-[16.5px] leading-[1.55] text-[#C7D4E4]">
              GeoVial embebe un servidor MCP (Model Context Protocol) que permite ejecutar
              todas estas herramientas desde Claude Desktop, en lenguaje natural.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Ejecuta geoprocesos en lenguaje natural",
                "Sin configuración de Python ni dependencias",
                "Incluido en la misma licencia",
              ].map((line) => (
                <div key={line} className="flex items-center gap-2.5">
                  <IconCheckMini />
                  <span className="text-[15px] text-[#EAF1F8]">{line}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0C1A30] px-[22px] py-5 font-mono text-[13px] leading-[1.9] shadow-2xl">
            <div className="mb-3.5 flex gap-1.5">
              <span className="h-[11px] w-[11px] rounded-full bg-[#E2564E]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#E8B23A]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#46A94E]" />
            </div>
            <div className="text-[#67A9E0]">$ geovial mcp start</div>
            <div className="text-[#9DB0C6]">▸ servidor MCP escuchando</div>
            <div className="text-[#9DB0C6]">▸ ArcGIS Pro conectado</div>
            <div className="mt-2 text-[#EAF1F8]">
              <span className="text-[#7FE0A0]">Claude</span> ▸ &ldquo;Calcula los cruces del eje con drenajes&rdquo;
            </div>
            <div className="text-[#7FE0A0]">✓ 12 obras de drenaje transversal generadas</div>
          </div>
        </div>
      </section>

      {/* ---------------- Cómo funciona ---------------- */}
      <section className="mx-auto max-w-[1160px] px-6 py-20">
        <div className="mb-11 max-w-[52ch]">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
            Cómo funciona
          </p>
          <h2 className="font-display text-[34px] font-semibold leading-[1.15] tracking-tight text-navy-700">
            De la descarga a tu licencia en cuatro pasos
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="border-t-2 pt-5" style={{ borderColor: step.color }}>
              <div className="mb-3.5 flex items-center justify-between">
                <span className="font-mono text-[13px] font-semibold" style={{ color: step.color }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <step.icon className="h-[22px] w-[22px] text-slate-400" />
              </div>
              <h3 className="mb-1.5 font-display text-[16.5px] font-semibold text-navy-700">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Ficha técnica (al final) ---------------- */}
      <section className="border-t border-slate-200 bg-[#f5f8fa]">
        <div className="mx-auto max-w-[1160px] px-6 py-[72px]">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
            Ficha técnica
          </p>
          <h2 className="mb-6.5 font-display text-[30px] font-semibold leading-[1.15] tracking-tight text-navy-700">
            Especificaciones del add-in
          </h2>
          <div
            className="relative overflow-hidden rounded-2xl border px-9 py-8 shadow-xl"
            style={{ backgroundImage: "var(--grad-field)", borderColor: "var(--border-on-dark)" }}
          >
            <div className="relative grid grid-cols-2 gap-x-11 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
              {[
                ["Compatibilidad", "ArcGIS Pro 3.x · QGIS 3.28+", "#EAF1F8"],
                ["Plataforma", "Windows 64-bit", "#EAF1F8"],
                ["Herramientas", "09 geoprocesos", "#EAF1F8"],
                ["Formato", ".esriAddinX · .zip", "#EAF1F8"],
                ["Prueba", "3 días", "#EAF1F8"],
                ["Licencia", "Desde $10/mes", "#7FE0A0"],
              ].map(([label, value, color]) => (
                <div key={label}>
                  <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">
                    {label}
                  </div>
                  <div className="font-mono text-[15px]" style={{ color }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-[18px]">
              <span className="font-mono text-xs tracking-wide text-[#9DB0C6]">
                v1.0 · Requiere Spatial Analyst para módulos ráster
              </span>
              <span className="font-mono text-xs tracking-wide text-[#67839E]">
                4°42′24″N 74°04′12″W · Bogotá, CO
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Conecta GeoVial a Claude ---------------- */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1160px] px-6 py-20">
          <div className="mb-11 max-w-[62ch]">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
              Integración MCP
            </p>
            <h2 className="mb-4 font-display text-[34px] font-semibold leading-[1.15] tracking-tight text-navy-700">
              Conecta GeoVial a Claude
            </h2>
            <p className="text-[16.5px] leading-[1.55] text-slate-600">
              Automatiza tus flujos de trabajo hablando con Claude, gracias al servidor MCP
              (Model Context Protocol) embebido en GeoVial. Funciona con Claude Code y con
              Claude Desktop.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:gap-8">
              {[
                "Compatible con ArcGIS Pro 3.x",
                "El servidor solo escucha en localhost",
                "Misma instalación para Code y Desktop",
              ].map((line) => (
                <div key={line} className="flex items-center gap-2">
                  <IconCheckMini />
                  <span className="text-sm text-slate-600">{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            {/* Claude Code */}
            <div className="rounded-2xl border border-slate-200 bg-[#f5f8fa] p-7">
              <h3 className="mb-1 font-display text-lg font-semibold text-navy-700">
                Claude Code (CLI)
              </h3>
              <p className="mb-5 text-sm text-slate-500">Un solo comando en tu terminal.</p>
              <ol className="mb-5 flex flex-col gap-3 text-sm text-slate-700">
                <li>
                  <span className="mr-2 font-mono text-xs font-semibold text-blue-600">1</span>
                  En ArcGIS Pro, pestaña GeoVial → &ldquo;Iniciar servidor MCP&rdquo;.
                </li>
                <li>
                  <span className="mr-2 font-mono text-xs font-semibold text-blue-600">2</span>
                  Corre este comando una sola vez:
                </li>
              </ol>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0C1A30] px-5 py-4 font-mono text-[12.5px] leading-[1.7] text-[#9DB0C6]">
                <span className="text-[#67A9E0]">$</span> claude mcp add --transport http geovial
                http://localhost:8767/mcp
              </div>
            </div>

            {/* Claude Desktop */}
            <div className="rounded-2xl border border-slate-200 bg-[#f5f8fa] p-7">
              <h3 className="mb-1 font-display text-lg font-semibold text-navy-700">
                Claude Desktop
              </h3>
              <p className="mb-5 text-sm text-slate-500">
                Requiere{" "}
                <a
                  href="https://nodejs.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline underline-offset-2"
                >
                  Node.js
                </a>{" "}
                instalado (para el puente mcp-remote).
              </p>
              <ol className="mb-5 flex flex-col gap-3 text-sm text-slate-700">
                <li>
                  <span className="mr-2 font-mono text-xs font-semibold text-green-600">1</span>
                  En ArcGIS Pro, pestaña GeoVial → &ldquo;Iniciar servidor MCP&rdquo;.
                </li>
                <li>
                  <span className="mr-2 font-mono text-xs font-semibold text-green-600">2</span>
                  En Claude Desktop:{" "}
                  <code className="rounded bg-slate-200 px-1.5 py-0.5 text-[12.5px]">
                    Configuración → Developer → &ldquo;Edit Config&rdquo;
                  </code>
                  . Ese botón abre el archivo correcto sin importar cómo esté instalado (la
                  ruta cambia si es instalador directo o de Microsoft Store).
                </li>
                <li>
                  <span className="mr-2 font-mono text-xs font-semibold text-green-600">3</span>
                  Agrega este bloque dentro de{" "}
                  <code className="rounded bg-slate-200 px-1.5 py-0.5 text-[12.5px]">
                    &quot;mcpServers&quot;
                  </code>{" "}
                  (si ya tienes otros conectores, agrégalo junto a los existentes, sin
                  borrarlos):
                </li>
              </ol>
              <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#0C1A30] px-5 py-4 font-mono text-[12px] leading-[1.7] text-[#9DB0C6]">
{`{
  "mcpServers": {
    "geovial": {
      "command": "npx",
      "args": ["-y", "mcp-remote",
        "http://localhost:8767/mcp"]
    }
  }
}`}
              </pre>
              <p className="mt-4 text-sm text-slate-700">
                <span className="mr-2 font-mono text-xs font-semibold text-green-600">4</span>
                Guarda, reinicia Claude Desktop y busca el ícono 🔌 — listo para chatear con
                tu mapa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA final ---------------- */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1160px] px-6 py-[76px] text-center">
          <div
            className="mx-auto mb-[26px] h-1 w-14 rounded-full"
            style={{ backgroundImage: "var(--grad-rule)" }}
          />
          <h2 className="mx-auto max-w-[18ch] font-display text-4xl font-bold leading-[1.1] tracking-tight text-navy-700">
            Empieza a usar GeoVial hoy
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[17px] leading-[1.55] text-slate-800">
            Descárgalo y pruébalo gratis 3 días. Luego elige un plan mensual o anual
            para seguir usándolo sin interrupciones.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
            <Link
              href="/descarga"
              className="rounded-md bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Ir a descarga
            </Link>
            <Link
              href="/precios"
              className="rounded-md border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-navy-700 transition-colors hover:bg-slate-100"
            >
              Ver precios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function IconCheckMini() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#7FE0A0" strokeWidth="1.8" className="h-5 w-5 shrink-0">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
