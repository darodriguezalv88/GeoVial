"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PLANS, type PlanId } from "@/lib/plans";

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-[14.5px] text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

export default function CheckoutPage() {
  if (!process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY) {
    return (
      <div className="mx-auto max-w-[560px] px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight text-navy-700">
          Los pagos todavía no están habilitados
        </h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-slate-800">
          Estamos activando el checkout. Mientras tanto puedes escribirnos desde{" "}
          <Link href="/contactenos" className="underline">
            Contáctenos
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  );
}

function CheckoutForm() {
  const params = useSearchParams();
  const planId = (params.get("plan") === "ANNUAL" ? "ANNUAL" : "MONTHLY") as PlanId;
  const plan = PLANS[planId];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [readyForPayment, setReadyForPayment] = useState(false);

  return (
    <div className="mx-auto max-w-[560px] px-6 pb-24 pt-[56px]">
      <p className="mb-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600">
        Checkout
      </p>
      <h1 className="font-display text-3xl font-bold tracking-tight text-navy-700">
        Plan {plan.label}
      </h1>
      <p className="mt-2 text-lg text-slate-800">
        ${plan.priceCop.toLocaleString("es-CO")} COP / {plan.interval}
        <span className="ml-2 text-sm text-slate-500">(~${plan.priceUsd} USD)</span>
      </p>

      {!readyForPayment ? (
        <div className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-navy-700">Nombre</span>
            <input
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-navy-700">Correo</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="flex items-start gap-2.5 text-[13px] text-slate-600">
            <input
              type="checkbox"
              required
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              Acepto el tratamiento de mis datos personales según la{" "}
              <a
                href="https://wompi.com/es/co/politica-de-privacidad/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                política de privacidad de Wompi
              </a>
              , nuestro procesador de pagos.
            </span>
          </label>

          <button
            type="button"
            disabled={!name.trim() || !email.trim() || !acceptedTerms}
            onClick={() => setReadyForPayment(true)}
            className="mt-2 rounded-md bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continuar al pago
          </button>
        </div>
      ) : (
        <WompiPaymentStep planId={planId} name={name} email={email} />
      )}
    </div>
  );
}

/**
 * Solo se monta después de que el usuario ya llenó y confirmó sus datos —
 * así el botón de Wompi (que abre su modal en "mousedown" sin respetar
 * validación propia) nunca existe en la página mientras falten datos, en
 * vez de tener que bloquear su clic.
 */
function WompiPaymentStep({ planId, name, email }: { planId: PlanId; name: string; email: string }) {
  const plan = PLANS[planId];
  const formRef = useRef<HTMLFormElement>(null);

  // Wompi exige que su <script> sea hijo directo del <form> que va a
  // someter (se rompe si queda anidado dentro de divs contenedores) y solo
  // lo detecta si el navegador lo carga como un nodo real insertado vía el
  // DOM (document.createElement), no uno declarado en JSX/React. `async =
  // false` es necesario porque los scripts creados dinámicamente son async
  // por defecto, lo que deja `document.currentScript` en null durante su
  // ejecución (Wompi lo usa para ubicarse a sí mismo y reemplazarse por el
  // botón).
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    // React (en desarrollo, StrictMode) monta/desmonta los efectos dos
    // veces a propósito; sin limpieza esto duplicaría el botón. Se anota
    // qué hijos existían antes de inyectar para poder quitar justo lo que
    // agregó Wompi (el script y el botón que renderiza) al desmontar.
    const childrenBefore = new Set(Array.from(form.children));

    const script = document.createElement("script");
    script.src = "https://checkout.wompi.co/widget.js";
    script.async = false;
    script.setAttribute("data-render", "button");
    script.setAttribute("data-widget-operation", "tokenize");
    script.setAttribute("data-public-key", process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ?? "");
    form.appendChild(script);

    // Wompi no expone ninguna forma de configurar el texto de su botón
    // ("Guarda tu método de pago"), así que se observa el DOM y se le
    // cambia el texto apenas lo renderiza, sin tocar su comportamiento.
    const observer = new MutationObserver(() => {
      const btn = form.querySelector("button");
      if (btn && btn.textContent !== "Pagar") btn.textContent = "Pagar";
    });
    observer.observe(form, { childList: true, subtree: true, characterData: true });

    return () => {
      observer.disconnect();
      for (const child of Array.from(form.children)) {
        if (!childrenBefore.has(child)) child.remove();
      }
    };
  }, []);

  return (
    <form ref={formRef} method="POST" action="/api/checkout" className="mt-8 flex flex-col gap-3">
      <input type="hidden" name="plan" value={planId} />
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="email" value={email} />

      <p className="text-[15px] text-slate-800">
        {name} &middot; {email}
      </p>
      <p className="text-center text-[13px] text-slate-500">
        Pago procesado de forma segura por Wompi — tus datos de tarjeta nunca pasan por nuestros
        servidores.
      </p>
      <p className="text-center text-base font-semibold text-navy-700">
        Total a pagar: ${plan.priceCop.toLocaleString("es-CO")} COP
      </p>
      {/* El botón de Wompi se inserta aquí mismo (como hijo directo del
          form) vía el useEffect de arriba. */}
    </form>
  );
}
