import Image from "next/image";
import Link from "next/link";
import {
  IconWater,
  IconCulvert,
  IconLayers,
  IconShield,
  IconMcp,
  IconGraduation,
  IconMail,
  IconLinkedin,
} from "@/components/icons";

export const metadata = {
  title: "GeoVial — Ingeniería Civil en Hidrología, Hidráulica y SIG",
  description:
    "GeoVial es la firma de ingeniería civil de Diego Rodríguez: estudios hidrológicos e hidráulicos, drenaje vial y urbano, alcantarillado, socavación y análisis geoespacial con SIG, para infraestructura vial, urbana y aeroportuaria.",
};

const gruposServicio = [
  {
    icon: IconWater,
    title: "Hidrología e hidráulica",
    items: "Estudios hidrológicos · Socavación y estructuras",
    description:
      "Caudales de diseño, niveles de inundación y modelación de estructuras de paso sobre cauces.",
  },
  {
    icon: IconCulvert,
    title: "Drenaje y redes",
    items: "Drenaje vial y urbano · Acueducto y alcantarillado",
    description:
      "Diseño de cunetas, alcantarillas y subdrenaje, y redes de acueducto, alcantarillado sanitario y pluvial.",
  },
  {
    icon: IconLayers,
    title: "Geoespacial y campo",
    items: "Análisis con SIG · Levantamientos con dron",
    description:
      "Cartografía, imágenes satelitales y modelos de terreno que alimentan cada estudio hidráulico.",
  },
  {
    icon: IconShield,
    title: "Gestión de proyectos",
    items: "Gestión del riesgo · Interventoría técnica",
    description:
      "Conceptos técnicos ante emergencias y seguimiento de contratos de consultoría y obra.",
  },
  {
    icon: IconMcp,
    title: "Automatización de flujos de trabajo",
    items: "Geoprocesos a la medida · Integraciones con IA",
    description: (
      <>
        Automatizamos tareas repetitivas de tu flujo de trabajo en SIG con geoprocesos a
        la medida — la misma disciplina detrás de nuestro{" "}
        <Link href="/geovial-addin" className="text-blue-600 underline underline-offset-2">
          add-in GeoVial
        </Link>
        .
      </>
    ),
  },
];

const trayectoria = [
  "UNGRD",
  "UPIT",
  "IDU",
  "AECOM",
  "INGETEC",
  "ANLA",
  "ENEL — Emgesa",
  "FINDETER",
  "Transmilenio",
  "EAAB",
];

const proyectos = [
  "Obras de emergencia y atención de desastres — UNGRD",
  "Prefactibilidad de corredores férreos y carreteros — UPIT",
  "Valorización de zonas industriales — IDU",
  "Regiotram de Occidente — CFRO",
  "Nuevo Aeropuerto Internacional de Chinchero · Cusco, Perú",
  "Interventoría ampliación Aeropuerto de Tumaco, Nariño — Aerocivil",
  "Tren Maya, tramo 4 — SCT / FONATUR, México",
  "Renovación de alcantarillado Av. Longitudinal de Occidente — IDU",
  "Plan Director del Recurso Hídrico de San Andrés — Findeter",
];

export default function Home() {
  return (
    <div>
      {/* ---------------- Hero: misma foto de la marca, ahora con mensaje corporativo ---------------- */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <Image
          src="/images/hero-dusk.png"
          alt="Corredor multimodal al atardecer: puente atirantado, autopista con estelas de luces, tren de carga y buque cruzando el río, con una ciudad encendiéndose al fondo"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 46%" }}
        />
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
              GeoVial · Ingeniería Civil — Hidrología, Hidráulica y SIG
            </p>
            <h1 className="max-w-[18ch] font-display text-[46px] font-bold leading-[1.08] tracking-tight text-white text-balance">
              Ingeniería hidrológica e hidráulica para infraestructura vial y urbana.
            </h1>
            <p className="mt-[22px] max-w-[46ch] text-lg leading-[1.55] text-[#D6E0EC]">
              Estudios, diseños y modelación hidráulica respaldados en más de trece años de
              experiencia y fortalecidos con Sistemas de Información Geográfica —
              de la prefactibilidad al diseño de detalle.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-3.5">
              <Link
                href="/servicios#cotizar"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <IconMail className="h-[18px] w-[18px]" />
                Solicitar servicios
              </Link>
              <Link
                href="/geovial-addin"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-navy-700 transition-colors hover:bg-slate-100"
              >
                Conoce GeoVial Addin
              </Link>
            </div>
            <p className="mt-6 font-mono text-[12.5px] tracking-wide text-[#8FA3BC]">
              Diego Rodríguez Álvarez · Ingeniero Civil · Especialista SIG · MEng. Universidad de los Andes
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Credenciales ---------------- */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-stretch justify-between gap-4 px-6 py-[30px]">
          {[
            ["13+", "Años de experiencia"],
            ["Docencia", "Pregrado y posgrado"],
            ["10+", "Entidades y firmas"],
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
            <div className="font-display text-[34px] font-bold tracking-tight text-green-600">MEng.</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-500">
              U. de los Andes
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Quién es GeoVial ---------------- */}
      <section className="mx-auto max-w-[1160px] px-6 py-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
              Quiénes somos
            </p>
            <h2 className="mb-4 font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-navy-700">
              Ingeniería especializada, con criterio de territorio
            </h2>
            <p className="mb-4 text-[16.5px] leading-[1.55] text-slate-800">
              GeoVial es la firma de ingeniería civil de Diego Armando Rodríguez Álvarez,
              ingeniero civil de la Universidad Nacional de Colombia, especialista en
              Sistemas de Información Geográfica de la Universidad Distrital y magíster en
              Ingeniería Civil con énfasis en manejo sostenible del recurso hídrico e
              hidroinformática de la Universidad de los Andes.
            </p>
            <p className="mb-5 text-[16.5px] leading-[1.55] text-slate-800">
              Con más de trece años de experiencia en diseño, formulación, evaluación,
              seguimiento e interventoría de proyectos de infraestructura vial, férrea,
              aeroportuaria y de saneamiento básico, GeoVial une el criterio hidrológico e
              hidráulico con el análisis geoespacial — la misma disciplina detrás del
              add-in <Link href="/geovial-addin" className="text-blue-600 underline underline-offset-2">GeoVial</Link>.
              También cuenta con experiencia como docente universitario de pregrado y
              posgrado en el área de Hidrotecnia.
            </p>
            <a
              href="https://www.linkedin.com/in/diego-armando-rodr%C3%ADguez-297b69133"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 underline underline-offset-2"
            >
              <IconLinkedin className="h-[18px] w-[18px]" />
              Ver perfil de LinkedIn
            </a>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl border px-8 py-7 shadow-xl"
            style={{ backgroundImage: "var(--grad-field)", borderColor: "var(--border-on-dark)" }}
          >
            <div className="relative mb-5 flex items-center gap-2.5">
              <IconGraduation className="h-6 w-6 text-[#7FE0A0]" />
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/70">
                Formación y docencia
              </span>
            </div>
            <div className="relative flex flex-col gap-5">
              {[
                [
                  "Maestría en Ingeniería Civil",
                  "Manejo sostenible de recursos hídricos e hidroinformática — Universidad de los Andes",
                ],
                [
                  "Especialización en SIG",
                  "Sistemas de Información Geográfica — Universidad Distrital Francisco José de Caldas",
                ],
                ["Ingeniería Civil", "Universidad Nacional de Colombia"],
                ["Docente universitario", "Cátedra de pregrado y posgrado en Hidrotecnia"],
              ].map(([title, sub]) => (
                <div key={title} className="border-l-2 border-[#3A8DD0] pl-4">
                  <div className="font-display text-[15px] font-semibold text-[#EAF1F8]">{title}</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-[#9DB0C6]">{sub}</div>
                </div>
              ))}
            </div>
            <div className="relative mt-6 border-t border-white/10 pt-4 font-mono text-[11px] tracking-wide text-[#67839E]">
              Primer lugar ECAES 2010 · Ingeniería Civil · Universidad Nacional de Colombia
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Servicios ---------------- */}
      <section className="border-t border-slate-200 bg-[#f5f8fa]">
        <div className="mx-auto max-w-[1160px] px-6 py-20">
          <div className="mb-11 max-w-[56ch]">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
              Servicios
            </p>
            <h2 className="font-display text-[34px] font-semibold leading-[1.15] tracking-tight text-navy-700">
              Ingeniería civil para tu proyecto, de punta a punta
            </h2>
            <p className="mt-3.5 text-[17px] leading-[1.55] text-slate-800">
              Estas son las grandes capacidades de GeoVial — conoce el detalle completo de
              cada servicio en la página de servicios.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {gruposServicio.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-[10px] bg-blue-100 text-blue-600">
                  <g.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-display text-[16.5px] font-semibold text-navy-700">{g.title}</h3>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.06em] text-blue-600">
                  {g.items}
                </p>
                <p className="text-sm leading-relaxed text-slate-500">{g.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <Link
              href="/servicios"
              className="inline-flex items-center rounded-md bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Trayectoria ---------------- */}
      <section className="mx-auto max-w-[1160px] px-6 py-20">
        <div className="mb-9 max-w-[56ch]">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
            Trayectoria
          </p>
          <h2 className="font-display text-[30px] font-semibold leading-[1.15] tracking-tight text-navy-700">
            Experiencia con entidades públicas y firmas de ingeniería
          </h2>
        </div>
        <div className="mb-8 flex flex-wrap gap-2.5">
          {trayectoria.map((nombre) => (
            <span
              key={nombre}
              className="rounded-md border border-slate-200 bg-white px-3.5 py-2 font-mono text-[13px] text-slate-700 shadow-sm"
            >
              {nombre}
            </span>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="mb-4 font-display text-[15px] font-semibold uppercase tracking-[0.08em] text-slate-500">
            Proyectos destacados
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {proyectos.map((p) => (
              <div key={p} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                <span className="text-[15px] text-slate-800">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Automatización / Software propio ---------------- */}
      <section className="relative overflow-hidden" style={{ backgroundImage: "var(--grad-field)" }}>
        <div className="relative mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-14 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#7FE0A0]">
              Automatización · Software propio
            </p>
            <h2 className="mb-4 max-w-[18ch] font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-white">
              También automatizamos tu flujo de trabajo
            </h2>
            <p className="mb-5 max-w-[48ch] text-[16.5px] leading-[1.55] text-[#C7D4E4]">
              Además de estudios y diseños, desarrollamos automatizaciones a la medida para
              tu flujo de trabajo en SIG: geoprocesos personalizados, integraciones y
              asistentes con IA. La primera de ellas ya es un producto completo —
              GeoVial Addin — disponible hoy para ArcGIS Pro y QGIS, con 3 días de prueba
              gratuita.
            </p>
            <div className="mb-6 flex flex-col gap-3">
              {[
                "Automatizaciones a la medida para tu flujo de trabajo en ArcGIS Pro o QGIS",
                "GeoVial Addin: nuestro primer producto, ya disponible con 3 días de prueba gratis",
                "Servidor MCP embebido para controlar geoprocesos conversando con Claude",
              ].map((line) => (
                <div key={line} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7FE0A0]" />
                  <span className="text-[15px] leading-[1.5] text-[#EAF1F8]">{line}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/descarga"
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-navy-700 shadow-sm transition-colors hover:bg-slate-100"
              >
                Probar GeoVial Addin gratis
              </Link>
              <Link
                href="/servicios#cotizar"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Cotizar una automatización
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0C1A30] px-[22px] py-5 font-mono text-[13px] leading-[1.9] shadow-2xl">
            <div className="mb-3.5 flex gap-1.5">
              <span className="h-[11px] w-[11px] rounded-full bg-[#E2564E]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#E8B23A]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#46A94E]" />
            </div>
            <div className="text-[#67A9E0]">$ geovial addin</div>
            <div className="text-[#9DB0C6]">▸ imágenes satelitales · índices espectrales</div>
            <div className="text-[#9DB0C6]">▸ drenajes · puentes · cruces con redes</div>
            <div className="text-[#9DB0C6]">▸ servidor MCP · geoprocesos por lenguaje natural</div>
            <div className="mt-2 text-[#7FE0A0]">✓ ArcGIS Pro 3.x · QGIS 3.28+ · 3 días gratis</div>
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
          <h2 className="mx-auto max-w-[20ch] font-display text-4xl font-bold leading-[1.1] tracking-tight text-navy-700">
            Hablemos de tu proyecto
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[17px] leading-[1.55] text-slate-800">
            Cuéntanos el alcance de tu estudio o diseño hidrológico, hidráulico o
            geoespacial y te respondemos con una propuesta.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
            <Link
              href="/servicios#cotizar"
              className="rounded-md bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Solicitar cotización
            </Link>
            <Link
              href="/contactenos"
              className="rounded-md border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-navy-700 transition-colors hover:bg-slate-100"
            >
              Contáctenos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
