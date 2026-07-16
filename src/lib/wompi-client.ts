/** Utilidades de Wompi seguras para el navegador (solo llave pública). */

export function wompiApiBase(): string {
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ?? "";
  return publicKey.startsWith("pub_prod_")
    ? "https://production.wompi.co/v1"
    : "https://sandbox.wompi.co/v1";
}

export type CardTokenParams = {
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  cardHolder: string;
};

/**
 * Tokeniza la tarjeta directamente contra la API de Wompi desde el
 * navegador: los datos de la tarjeta nunca tocan nuestro servidor. Requiere
 * solo la llave pública (segura de exponer en el cliente).
 */
export async function tokenizeCard(params: CardTokenParams): Promise<string> {
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
  if (!publicKey) throw new Error("Wompi no está configurado.");

  const res = await fetch(`${wompiApiBase()}/tokens/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${publicKey}`,
    },
    body: JSON.stringify({
      number: params.number,
      exp_month: params.expMonth,
      exp_year: params.expYear,
      cvc: params.cvc,
      card_holder: params.cardHolder,
    }),
  });

  const json = await res.json();
  if (!res.ok) {
    const message = json?.error?.messages
      ? Object.values(json.error.messages).flat().join(" ")
      : "La tarjeta fue rechazada.";
    throw new Error(message);
  }

  return json.data.id as string;
}
