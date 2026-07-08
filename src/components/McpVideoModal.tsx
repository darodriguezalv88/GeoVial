"use client";

import { useRef, useState } from "react";
import { IconMcp } from "@/components/icons";

/**
 * Tarjeta "Servidor MCP embebido" + modal con el video explicativo.
 * El video vive en /public/videos/mcp-demo.mp4 (cópialo ahí).
 * Al terminar el video (evento onEnded) se revela una cortinilla de cierre
 * con la marca GeoVial y un botón para volver a verlo.
 */
export default function McpVideoModal({ cardNumber = 8 }: { cardNumber?: number }) {
  const [open, setOpen] = useState(false);
  const [showOutro, setShowOutro] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function openModal() {
    setShowOutro(false);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    const v = videoRef.current;
    if (v) v.pause();
  }

  function onEnded() {
    setShowOutro(true);
  }

  function rewatch() {
    setShowOutro(false);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className="group relative overflow-hidden rounded-2xl border p-5 text-left shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
        style={{ backgroundImage: "var(--grad-field)", borderColor: "var(--border-on-dark)" }}
      >
        <span className="absolute right-5 top-[18px] font-mono text-xs text-white/30">
          {String(cardNumber).padStart(2, "0")}
        </span>
        <span className="mb-3.5 inline-flex items-center gap-1.5 rounded-full bg-green-600 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white">
          NUEVO
        </span>
        <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-[10px] bg-[rgba(70,169,78,0.18)] text-[#7FE0A0]">
          <IconMcp className="h-6 w-6" />
        </div>
        <h3 className="mb-1.5 font-display text-[16.5px] font-semibold text-[#EAF1F8]">
          Servidor MCP embebido
        </h3>
        <p className="mb-3.5 text-sm leading-relaxed text-[#9DB0C6]">
          Controla ArcGIS Pro y todas estas herramientas desde Claude, en lenguaje
          natural.
        </p>
        <div className="inline-flex items-center gap-2">
          <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-[#7FE0A0] text-navy-800">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="font-mono text-[11.5px] tracking-wide text-[#7FE0A0]">
            VER CÓMO FUNCIONA · 1:38
          </span>
        </div>
      </button>

      {open && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-[100] flex items-center justify-center p-8"
          style={{ background: "rgba(6,13,26,0.86)", backdropFilter: "blur(3px)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-video w-full max-w-[1180px] overflow-hidden rounded-2xl bg-black shadow-2xl"
          >
            <video
              ref={videoRef}
              src="/videos/mcp-demo.mp4"
              autoPlay
              controls
              playsInline
              onEnded={onEnded}
              className="absolute inset-0 h-full w-full object-contain"
            />

            {showOutro && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-navy-900"
                style={{ animation: "mcpOutroIn .6s ease both" }}
              >
                <div className="mb-[18px] flex items-center gap-3">
                  <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
                    <rect x="1" y="1" width="30" height="30" rx="8" fill="#102540" />
                    <path
                      d="M6 22c0-6 8-4 8-10s8-4 12 0"
                      stroke="url(#mcpOutroGrad)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <circle cx="7" cy="23" r="2.6" fill="#2E9140" />
                    <circle cx="25" cy="11" r="2.6" fill="#2570B8" />
                    <defs>
                      <linearGradient id="mcpOutroGrad" x1="0" y1="0" x2="32" y2="32">
                        <stop stopColor="#2570B8" />
                        <stop offset="1" stopColor="#2E9140" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-display text-[46px] font-bold tracking-tight">
                    <span className="text-white">Geo</span>
                    <span
                      style={{
                        backgroundImage: "linear-gradient(115deg, #3A8DD0, #46A94E)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "transparent",
                      }}
                    >
                      Vial
                    </span>
                  </span>
                </div>
                <div
                  className="mb-5 h-[3px] w-[120px] rounded-full"
                  style={{ backgroundImage: "linear-gradient(90deg, #3A8DD0, #46A94E)" }}
                />
                <div className="mb-2.5 font-display text-2xl font-medium text-[#EAF1F8]">
                  Habla. Explora. Diseña.
                </div>
                <div className="mb-7 font-mono text-sm tracking-wide text-[#7FE0A0]">
                  MCP integrado · Prueba gratis 3 días
                </div>
                <button
                  onClick={rewatch}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-[18px] py-2.5 text-sm font-semibold text-[#EAF1F8]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Ver de nuevo
                </button>
              </div>
            )}

            <button
              onClick={closeModal}
              aria-label="Cerrar video"
              className="absolute right-3.5 top-3.5 grid h-[38px] w-[38px] place-items-center rounded-full border border-white/20 bg-[rgba(12,26,48,0.7)] text-lg text-[#EAF1F8]"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes mcpOutroIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
