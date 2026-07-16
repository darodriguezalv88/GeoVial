"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { PLANS, type PlanId } from "@/lib/plans";
import { tokenizeCard } from "@/lib/wompi-client";

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
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const cardToken = await tokenizeCard({
        number: cardNumber.replace(/\s+/g, ""),
        expMonth,
        expYear,
        cvc,
        cardHolder,
      });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, plan: planId, cardToken }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "No se pudo procesar el pago.");
        return;
      }

      if (data.status === "DECLINED" || data.status === "ERROR") {
        setError("El banco rechazó la transacción. Verifica los datos de tu tarjeta o intenta con otra.");
        return;
      }

      sendGAEvent("event", "purchase_attempt", { plan: planId });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-[560px] px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-navy-700">
          ¡Pago recibido!
        </h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-slate-800">
          Te enviamos tu clave de licencia a <strong>{email}</strong>. Si el pago quedó pendiente
          de confirmación con tu banco, la recibirás en cuanto se apruebe (normalmente en
          segundos).
        </p>
        <Link
          href="/descarga"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Ir a instalación
        </Link>
      </div>
    );
  }

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

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-semibold text-navy-700">Nombre</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-semibold text-navy-700">Correo</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-semibold text-navy-700">Número de tarjeta</span>
          <input
            required
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className={inputClass}
          />
        </label>
        <div className="grid grid-cols-3 gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-navy-700">Mes (MM)</span>
            <input
              required
              inputMode="numeric"
              placeholder="06"
              maxLength={2}
              value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-navy-700">Año (AA)</span>
            <input
              required
              inputMode="numeric"
              placeholder="29"
              maxLength={2}
              value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-navy-700">CVC</span>
            <input
              required
              inputMode="numeric"
              placeholder="123"
              maxLength={4}
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-[12px] font-semibold text-navy-700">Nombre del titular</span>
          <input
            required
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
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
          type="submit"
          disabled={loading || !acceptedTerms}
          className="mt-2 w-full rounded-md bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Procesando…" : `Pagar $${plan.priceCop.toLocaleString("es-CO")} COP`}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
