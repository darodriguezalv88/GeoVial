import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Contáctenos — GeoVial",
  description: "Escríbenos tus preguntas sobre GeoVial: licencias, soporte o alianzas.",
};

export default function ContactenosPage() {
  return (
    <div className="mx-auto max-w-[600px] px-6 pb-24 pt-[72px]">
      <p className="mb-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
        Contáctenos
      </p>
      <h1 className="font-display text-[44px] font-bold leading-[1.08] tracking-tight text-navy-700">
        Hablemos
      </h1>
      <p className="mt-4 text-lg leading-[1.55] text-slate-800">
        ¿Preguntas sobre licencias, soporte técnico o alguna alianza? Escríbenos y te
        respondemos directo a tu correo.
      </p>
      <p className="mt-3 text-[15px] leading-[1.55] text-slate-600">
        ¿Necesitas automatizar alguna funcionalidad o proceso puntual de tu flujo de
        trabajo en ArcGIS Pro? Cuéntanos qué necesitas — también hacemos desarrollos a
        la medida.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
        <QuoteForm source="contacto" />
      </div>
    </div>
  );
}
