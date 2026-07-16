/**
 * Configuración de los planes de licencia de GeoVial. El checkout corre
 * por Wompi, que liquida en pesos colombianos (COP): priceCop es el precio
 * real, fijo, definido en pesos (no depende de la TRM). priceUsd es solo
 * una referencia aproximada que se muestra junto al precio en pesos.
 */

export type PlanId = "MONTHLY" | "ANNUAL";

export type PlanConfig = {
  id: PlanId;
  label: string;
  priceUsd: number;
  priceCop: number;
  interval: "mes" | "año";
};

export const PLANS: Record<PlanId, PlanConfig> = {
  MONTHLY: {
    id: "MONTHLY",
    label: "Mensual",
    priceUsd: 12,
    priceCop: 40_000,
    interval: "mes",
  },
  ANNUAL: {
    id: "ANNUAL",
    label: "Anual",
    priceUsd: 60,
    priceCop: 200_000,
    interval: "año",
  },
};

/**
 * Si Wompi está configurado (llave pública presente). Mientras la cuenta de
 * Wompi siga en revisión y no tengamos las variables puestas en Render, el
 * checkout debe mostrarse deshabilitado ("Próximamente") en vez de dejar a
 * un visitante real llegar a un formulario que va a fallar.
 */
export function isPaymentsEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY);
}
