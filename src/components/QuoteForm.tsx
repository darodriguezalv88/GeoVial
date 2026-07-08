"use client";

import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { IconCheck } from "@/components/icons";

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

type FormState = {
  nombre: string;
  correo: string;
  telefono: string;
  asunto: string;
  mensaje: string;
};

const emptyForm: FormState = { nombre: "", correo: "", telefono: "", asunto: "", mensaje: "" };

export default function QuoteForm({ source = "cotizacion" }: { source?: "cotizacion" | "contacto" }) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Ocurrió un error al enviar el mensaje.");
        return;
      }

      setSent(true);
      sendGAEvent("event", "generate_lead", { source });
      setForm(emptyForm);
    } catch {
      setError("No se pudo conectar con el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 inline-flex rounded-full bg-green-100 p-3 text-green-600">
          <IconCheck className="h-8 w-8" />
        </div>
        <h2 className="font-display text-xl font-bold text-navy-700">¡Mensaje enviado!</h2>
        <p className="mt-2 text-sm text-slate-500">
          Recibimos tu solicitud de cotización. Te contactamos pronto a tu correo.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-[22px] text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      <div className="grid gap-[18px] sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-navy-700">
            Nombre <span className="text-blue-600">*</span>
          </span>
          <input
            required
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            placeholder="Tu nombre"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-navy-700">
            Correo <span className="text-blue-600">*</span>
          </span>
          <input
            type="email"
            required
            value={form.correo}
            onChange={(e) => update("correo", e.target.value)}
            placeholder="tu@correo.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-navy-700">Teléfono</span>
        <input
          value={form.telefono}
          onChange={(e) => update("telefono", e.target.value)}
          placeholder="Opcional"
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-navy-700">
          Asunto <span className="text-blue-600">*</span>
        </span>
        <input
          required
          value={form.asunto}
          onChange={(e) => update("asunto", e.target.value)}
          placeholder="Ej. Levantamiento corredor vía X"
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-navy-700">
          Mensaje <span className="text-blue-600">*</span>
        </span>
        <textarea
          required
          rows={5}
          value={form.mensaje}
          onChange={(e) => update("mensaje", e.target.value)}
          placeholder="Cuéntanos la ubicación y extensión del proyecto..."
          className={inputClass}
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
        {loading ? "Enviando…" : "Enviar solicitud"}
      </button>
    </form>
  );
}
