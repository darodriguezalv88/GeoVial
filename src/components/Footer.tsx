import Logo from "./Logo";
import { IconMail, IconInstagram, IconLinkedin } from "./icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-navy-800">
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      >
        <g fill="none" stroke="#8FC1F0" strokeWidth="1">
          <path d="M-40 60 C220 20 430 110 660 66 S1060 10 1260 90" />
          <path d="M-40 120 C220 80 430 170 660 126 S1060 70 1260 150" />
        </g>
      </svg>
      <div className="relative mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-5 px-6 py-10">
        <Logo />
        <p className="max-w-[44ch] text-[13.5px] leading-relaxed text-[#9DB0C6]">
          Ingeniería civil en hidrología, hidráulica y Sistemas de Información Geográfica
          para infraestructura vial y urbana.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="mailto:gerencia@geovialpro.com"
            className="flex items-center gap-2 text-[13.5px] text-[#9DB0C6] transition-colors hover:text-white"
          >
            <IconMail className="h-4 w-4 shrink-0" />
            gerencia@geovialpro.com
          </a>
          <a
            href="https://www.instagram.com/geovialpro"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[13.5px] text-[#9DB0C6] transition-colors hover:text-white"
          >
            <IconInstagram className="h-4 w-4 shrink-0" />
            @geovialpro
          </a>
          <a
            href="https://www.linkedin.com/in/diego-armando-rodr%C3%ADguez-297b69133"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[13.5px] text-[#9DB0C6] transition-colors hover:text-white"
          >
            <IconLinkedin className="h-4 w-4 shrink-0" />
            LinkedIn
          </a>
        </div>
        <p className="font-mono text-xs tracking-wide text-[#67839E]">
          © {new Date().getFullYear()} GeoVial
        </p>
      </div>
    </footer>
  );
}
