// Íconos SVG simples e inline (trazo, sin dependencias externas).

type IconProps = { className?: string };

const base = "h-6 w-6";

export function IconSatellite({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M7 7l3 3-4 4-3-3a3 3 0 014-4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 14l3 3-2 2-3-3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10l4 4" strokeLinecap="round" />
      <path d="M13 5l1.5-1.5M19 11l1.5-1.5M16 3l2 2M18 5l2 2" strokeLinecap="round" />
      <path d="M3 21l4-4" strokeLinecap="round" />
    </svg>
  );
}

export function IconChart({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M4 19h16" strokeLinecap="round" />
      <rect x="6" y="10" width="3" height="7" rx="0.5" />
      <rect x="11" y="6" width="3" height="11" rx="0.5" />
      <rect x="16" y="13" width="3" height="4" rx="0.5" />
    </svg>
  );
}

export function IconWater({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCulvert({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M3 15h18" strokeLinecap="round" />
      <circle cx="8" cy="15" r="3.2" />
      <circle cx="16" cy="15" r="3.2" />
      <path d="M3 8l18-3" strokeLinecap="round" />
    </svg>
  );
}

export function IconBridge({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M3 12c3-4 15-4 18 0" strokeLinecap="round" />
      <path d="M3 12v6M8 12v6M12 12v6M16 12v6M21 12v6" strokeLinecap="round" />
      <path d="M2 18h20" strokeLinecap="round" />
    </svg>
  );
}

export function IconNetwork({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M6.7 7.3L11 16M17.3 7.3L13 16M7 6h10" strokeLinecap="round" />
    </svg>
  );
}

export function IconRoute({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M5 8c0 6 14 2 14 8" strokeLinecap="round" />
      <path d="M9.5 9.2v.01M12.5 10.6v.01M15.5 13v.01" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

export function IconMcp({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <rect x="3" y="4" width="8" height="6" rx="1.2" />
      <rect x="13" y="14" width="8" height="6" rx="1.2" />
      <path d="M7 10v3a2 2 0 002 2h4M17 14v-1a2 2 0 00-2-2H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconDownload({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconInstall({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <rect x="4" y="4" width="16" height="12" rx="1.5" />
      <path d="M9 20h6M12 16v4" strokeLinecap="round" />
    </svg>
  );
}

export function IconClock({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconKey({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M17 6l3 3M14 9l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* --- Servicios: fotogrametría con dron --- */

export function IconDrone({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <rect x="10" y="10.5" width="4" height="3" rx="0.6" />
      <path d="M10 11.5H6.5M14 11.5h3.5M11 10.5V8M13 10.5V8" strokeLinecap="round" />
      <circle cx="5" cy="6.5" r="2" />
      <circle cx="19" cy="6.5" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
      <path d="M6.5 8L10 10.5M17.5 8L14 10.5M6.5 15.5L10 13M17.5 15.5L14 13" strokeLinecap="round" />
    </svg>
  );
}

export function IconLayers({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 17.5l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPointCloud({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <circle cx="5" cy="7" r="1.3" />
      <circle cx="10" cy="5" r="1.3" />
      <circle cx="15" cy="6.5" r="1.3" />
      <circle cx="19" cy="9" r="1.3" />
      <circle cx="7" cy="11.5" r="1.3" />
      <circle cx="12" cy="10" r="1.3" />
      <circle cx="17" cy="12.5" r="1.3" />
      <circle cx="4" cy="16" r="1.3" />
      <circle cx="9" cy="15" r="1.3" />
      <circle cx="14" cy="16.5" r="1.3" />
      <circle cx="19" cy="17" r="1.3" />
      <circle cx="11" cy="20" r="1.3" />
    </svg>
  );
}

export function IconMesh({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M4 8l8-4 8 4-8 4-8-4z" strokeLinejoin="round" />
      <path d="M4 8v8l8 4 8-4V8" strokeLinejoin="round" />
      <path d="M4 8l8 4M20 8l-8 4M12 12v8" />
    </svg>
  );
}

export function IconMail({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLinkedin({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5v6M8 7.8v.02" strokeLinecap="round" />
      <path d="M12 16.5v-3.8c0-1.2.9-2.2 2-2.2s2 1 2 2.2v3.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12.7v3.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconInstagram({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* --- Servicios de ingeniería: hidrología, hidráulica y SIG --- */

export function IconShield({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGraduation({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M2 9l10-5 10 5-10 5-10-5z" strokeLinejoin="round" />
      <path d="M6 11.5V17c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 9v6" strokeLinecap="round" />
    </svg>
  );
}
