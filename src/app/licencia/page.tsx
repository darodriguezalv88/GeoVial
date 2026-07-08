export const metadata = {
  title: "Lista de espera — GeoVial",
  description: "Únete a la lista de espera de GeoVial: te contactaremos cuando los planes de licencia estén disponibles.",
};

import LicenseForm from "./LicenseForm";

export default function LicenciaPage() {
  return (
    <div className="mx-auto max-w-[600px] px-6 pb-24 pt-[72px]">
      <p className="mb-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-green-600">
        Lista de espera
      </p>
      <h1 className="font-display text-[44px] font-bold leading-[1.08] tracking-tight text-navy-700">
        Solicita acceso
      </h1>
      <p className="mt-4 text-lg leading-[1.55] text-slate-800">
        Estamos definiendo los planes de licencia de GeoVial. Déjanos tu nombre y
        correo y te contactamos apenas estén disponibles.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
        <LicenseForm />
      </div>

      <p className="mt-[18px] text-[13.5px] text-slate-500">
        Si ya te registraste con este mismo correo, no hace falta que lo hagas de nuevo.
      </p>
    </div>
  );
}
