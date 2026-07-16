"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CancelarPage() {
  return (
    <Suspense>
      <CancelarForm />
    </Suspense>
  );
}

function CancelarForm() {
  const params = useSearchParams();
  const licenseId = params.get("license");
  const signature = params.get("sig");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleCancel() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseId, signature }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo cancelar la suscripción.");
        return;
      }
      setDone(true);
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  if (!licenseId || !signature) {
    return (
      <div className="mx-auto max-w-[520px] px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight text-navy-700">
          Enlace inválido
        </h1>
        <p className="mt-4 text-[15.5px] text-slate-800">
          Usa el enlace de &quot;Cancelar suscripción&quot; que llegó en el correo de tu licencia, o
          escríbenos desde{" "}
          <Link href="/contactenos" className="underline">
            Contáctenos
          </Link>
          .
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-[520px] px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight text-navy-700">
          Suscripción cancelada
        </h1>
        <p className="mt-4 text-[15.5px] text-slate-800">
          No se te va a cobrar de nuevo. Conservas acceso hasta el final del período ya pagado.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[520px] px-6 py-24 text-center">
      <h1 className="font-display text-2xl font-bold tracking-tight text-navy-700">
        ¿Cancelar tu suscripción de GeoVial?
      </h1>
      <p className="mt-4 text-[15.5px] leading-relaxed text-slate-800">
        Dejarás de pagar la renovación automática. Conservas el acceso hasta el final del período
        que ya pagaste — esto no se puede deshacer desde aquí, tendrías que suscribirte de nuevo.
      </p>
      <button
        onClick={handleCancel}
        disabled={loading}
        className="mt-6 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Cancelando…" : "Sí, cancelar suscripción"}
      </button>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
