/**
 * Marca GeoVial: emblema (puente + curva topográfica, gradiente azul→verde
 * de la identidad) + wordmark tipográfico en Poppins.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="8" fill="#102540" />
        <path
          d="M6 22c0-6 8-4 8-10s8-4 12 0"
          stroke="url(#gvLogoGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path d="M4 12c4-2 8 2 12 0s8-3 12 0" stroke="#3A8DD0" strokeWidth="1" opacity="0.5" />
        <circle cx="7" cy="23" r="2.4" fill="#2E9140" />
        <circle cx="25" cy="11" r="2.4" fill="#2570B8" />
        <defs>
          <linearGradient id="gvLogoGrad" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#2570B8" />
            <stop offset="1" stopColor="#2E9140" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">
        <span className="text-navy-700">Geo</span>
        <span
          style={{
            backgroundImage: "var(--grad-brand)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Vial
        </span>
      </span>
    </span>
  );
}
