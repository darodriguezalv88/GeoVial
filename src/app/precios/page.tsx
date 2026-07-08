import Link from "next/link";
import { IconCheck } from "@/components/icons";
import { PLANS, checkoutUrl } from "@/lib/plans";

export const metadata = {
  title: "Precios — GeoVial",
  description: "Planes de licencia de GeoVial para ArcGIS Pro: mensual o anual.",
};

const features = [
  "Imágenes satelitales (Landsat / Sentinel-2, DEM)",
  "Índices espectrales y extracción de cuerpos de agua",
  "Obras de drenaje transversal",
  "Obras de puentes",
  "Redes existentes (HS / HC)",
  "Abscisas a puntos",
  "Servidor MCP para Claude",
  "1 dispositivo por licencia, soporte por correo",
];

export default function PreciosPage() {
  const monthlyUrl = checkoutUrl("MONTHLY");
  const annualUrl = checkoutUrl("ANNUAL");

  return (
    <div className="mx-auto max-w-[920px] px-6 pb-24 pt-[72px]">
      <p className="mb-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
        Precios
      </p>
      <h1 className="font-display text-[44px] font-bold leading-[1.08] tracking-tight text-navy-700">
        Elige tu plan
      </h1>
      <p className="mt-4 max-w-[56ch] text-lg leading-[1.55] text-slate-800">
        Todas las herramientas de GeoVial incluidas en ambos planes. Prueba gratis
        3 días desde la instalación, sin tarjeta.
      </p>

      <div className="mt-[34px] grid gap-6 sm:grid-cols-2">
        <PlanCard
          plan={PLANS.MONTHLY}
          checkoutHref={monthlyUrl}
          ctaLabel="Suscribirme mensual"
        />
        <PlanCard
          plan={PLANS.ANNUAL}
          checkoutHref={annualUrl}
          ctaLabel="Suscribirme anual"
          highlight
          badge="Ahorra 25%"
        />
      </div>

      <section className="mt-[52px]">
        <h2 className="mb-[18px] font-display text-2xl font-semibold tracking-tight text-navy-700">
          Incluido en ambos planes
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3">
              <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <span className="text-base text-slate-800">{f}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-[52px] rounded-2xl border border-slate-200 bg-slate-100 p-7">
        <h2 className="mb-2 font-display text-xl font-semibold tracking-tight text-navy-700">
          ¿Ya tienes una clave de licencia?
        </h2>
        <p className="mb-[18px] max-w-[56ch] text-[15.5px] leading-[1.55] text-slate-800">
          Actívala desde la pestaña GeoVial en ArcGIS Pro (o el panel GeoVial en QGIS), en el
          botón &quot;Licencia&quot;.
        </p>
        <Link
          href="/descarga"
          className="inline-block rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-slate-50"
        >
          Ir a instalación
        </Link>
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  checkoutHref,
  ctaLabel,
  highlight,
  badge,
}: {
  plan: (typeof PLANS)[keyof typeof PLANS];
  checkoutHref: string | null;
  ctaLabel: string;
  highlight?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white p-7 shadow-md ${
        highlight ? "border-blue-600 border-t-[3px]" : "border-slate-200 border-t-[3px] border-t-navy-700"
      }`}
    >
      {badge && (
        <span className="absolute right-6 top-6 rounded-full bg-green-100 px-2.5 py-0.5 text-[11.5px] font-semibold text-green-700">
          {badge}
        </span>
      )}
      <p className="font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-slate-500">
        {plan.label}
      </p>
      <p className="mt-2 font-display text-4xl font-bold tracking-tight text-navy-700">
        ${plan.priceUsd}
        <span className="text-lg font-medium text-slate-500"> USD / {plan.interval}</span>
      </p>

      {checkoutHref ? (
        <a
          href={checkoutHref}
          className={`mt-6 inline-flex w-full items-center justify-center rounded-md px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors ${
            highlight ? "bg-blue-600 hover:bg-blue-700" : "bg-navy-700 hover:bg-navy-800"
          }`}
        >
          {ctaLabel}
        </a>
      ) : (
        <button
          disabled
          title="Los pagos todavía no están habilitados."
          className="mt-6 w-full cursor-not-allowed rounded-md bg-slate-200 px-6 py-3.5 text-base font-semibold text-slate-500"
        >
          Próximamente
        </button>
      )}
    </div>
  );
}
