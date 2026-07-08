import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#f5f8fa]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-[1160px] items-center justify-between gap-5 px-6 py-3.5">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-5 text-[14.5px] font-semibold text-slate-800">
          <Link href="/" className="px-0.5 py-1.5 transition-colors hover:text-blue-600">
            Inicio
          </Link>
          <Link href="/servicios" className="px-0.5 py-1.5 transition-colors hover:text-blue-600">
            Servicios
          </Link>
          <Link href="/descarga" className="px-0.5 py-1.5 transition-colors hover:text-blue-600">
            Descarga
          </Link>
          <Link href="/contactenos" className="px-0.5 py-1.5 transition-colors hover:text-blue-600">
            Contáctenos
          </Link>
          <Link
            href="/precios"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Ver precios
          </Link>
        </div>
      </nav>
    </header>
  );
}
