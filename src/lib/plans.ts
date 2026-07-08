/**
 * Configuración de los planes de licencia de GeoVial y construcción de la
 * URL de checkout hosted de Lemon Squeezy. Las variantId/store no son
 * secretas (quedan visibles en la propia URL de checkout), por eso viven
 * en variables NEXT_PUBLIC_*.
 */

export type PlanId = "MONTHLY" | "ANNUAL";

export type PlanConfig = {
  id: PlanId;
  label: string;
  priceUsd: number;
  interval: "mes" | "año";
  variantId: string | undefined;
};

export const PLANS: Record<PlanId, PlanConfig> = {
  MONTHLY: {
    id: "MONTHLY",
    label: "Mensual",
    priceUsd: 10,
    interval: "mes",
    variantId: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_MONTHLY,
  },
  ANNUAL: {
    id: "ANNUAL",
    label: "Anual",
    priceUsd: 90,
    interval: "año",
    variantId: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ANNUAL,
  },
};

const STORE_SUBDOMAIN = process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE;

/**
 * URL de checkout hosted de Lemon Squeezy para un plan. Devuelve null si
 * todavía no están configuradas las variables de entorno (antes de tener
 * la cuenta de Lemon Squeezy lista), para que la UI pueda mostrar un botón
 * deshabilitado en vez de un link roto.
 */
export function checkoutUrl(planId: PlanId, opts?: { email?: string }): string | null {
  const plan = PLANS[planId];
  if (!STORE_SUBDOMAIN || !plan.variantId) return null;

  const url = new URL(`https://${STORE_SUBDOMAIN}.lemonsqueezy.com/checkout/buy/${plan.variantId}`);
  if (opts?.email) url.searchParams.set("checkout[email]", opts.email);
  return url.toString();
}
