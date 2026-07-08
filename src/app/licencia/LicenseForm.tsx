"use client";

import { useState } from "react";
import { IconCheck } from "@/components/icons";

type RequestResult = {
  reused: boolean;
};

export default function LicenseForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RequestResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/license/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Ocurrió un error al solicitar la licencia.");
        return;
      }

      setResult({ reused: Boolean(data.reused) });
    } catch {
      setError("No se pudo conectar con el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 inline-flex rounded-full bg-green-100 p-3 text-green-600">
          <IconCheck className="h-8 w-8" />
        </div>
        <h2 className="font-display text-xl font-bold text-navy-700">
          {result.reused ? "Ya estabas en la lista de espera" : "¡Quedaste en la lista de espera!"}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Estamos definiendo los planes de licencia. Te vamos a contactar por
          correo apenas estén disponibles.
        </p>
        <button
          onClick={() => {
            setResult(null);
            setName("");
            setEmail("");
          }}
          className="mt-[22px] text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-navy-700">Nombre</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-navy-700">
          Correo electrónico <span className="text-blue-600">*</span>
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />
      </label>

      {error && (
        <p className="rounded-md border border-red-300 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Enviando…" : "Unirme a la lista de espera"}
      </button>
    </form>
  );
}
