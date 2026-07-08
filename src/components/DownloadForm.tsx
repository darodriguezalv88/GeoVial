"use client";

import { useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { IconDownload } from "@/components/icons";

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-[14.5px] text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

export default function DownloadForm({
  product,
  fileUrl,
  onDownloaded,
}: {
  product: "ARCGIS" | "QGIS";
  fileUrl: string;
  onDownloaded?: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, product }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Ocurrió un error, intenta de nuevo.");
        return;
      }

      setUnlocked(true);
      sendGAEvent("event", "download", { product });
      onDownloaded?.();
      requestAnimationFrame(() => linkRef.current?.click());
    } catch {
      setError("No se pudo conectar con el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (unlocked) {
    return (
      <div className="flex flex-col items-start gap-2">
        <p className="text-[15px] font-semibold text-green-700">
          ¡Gracias{name ? `, ${name.split(" ")[0]}` : ""}! Tu descarga debería empezar en un momento.
        </p>
        <a
          ref={linkRef}
          href={fileUrl}
          download
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          <IconDownload className="h-4 w-4" />
          ¿No empezó? Haz clic aquí
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <label className="flex min-w-[160px] flex-1 flex-col gap-1">
        <span className="text-[12px] font-semibold text-navy-700">Nombre</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className={inputClass}
        />
      </label>
      <label className="flex min-w-[200px] flex-1 flex-col gap-1">
        <span className="text-[12px] font-semibold text-navy-700">Correo</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className={inputClass}
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <IconDownload className="h-[18px] w-[18px]" />
        {loading ? "Un momento…" : "Descargar ahora"}
      </button>
      {error && <p className="w-full text-sm text-red-600">{error}</p>}
    </form>
  );
}
