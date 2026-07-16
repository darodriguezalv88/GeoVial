import Link from "next/link";

export default async function CheckoutGraciasPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; email?: string }>;
}) {
  const { status, email } = await searchParams;
  const declined = status === "DECLINED" || status === "ERROR";

  if (declined) {
    return (
      <div className="mx-auto max-w-[560px] px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight text-navy-700">
          El pago no pudo procesarse
        </h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-slate-800">
          El banco rechazó la transacción. Verifica los datos de tu tarjeta o intenta con otra.
        </p>
        <Link
          href="/precios"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Volver a intentar
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[560px] px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold tracking-tight text-navy-700">¡Pago recibido!</h1>
      <p className="mt-4 text-[15.5px] leading-relaxed text-slate-800">
        {email ? (
          <>
            Te enviamos tu clave de licencia a <strong>{email}</strong>.
          </>
        ) : (
          "Te enviamos tu clave de licencia por correo."
        )}{" "}
        Si el pago quedó pendiente de confirmación con tu banco, la recibirás en cuanto se apruebe
        (normalmente en segundos).
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
