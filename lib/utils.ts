import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: "usd" | "eur" | "gbp"
): string {
  const currencyOptions: {
    [key: string]: { locale: string; currency: string };
  } = {
    usd: { locale: "en-US", currency: "USD" },
    eur: { locale: "de-DE", currency: "EUR" },
    gbp: { locale: "en-GB", currency: "GBP" },
  };

  const { locale, currency: currencyCode } = currencyOptions[currency];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatSalaryCurrency(
  amount: number,
  currency: "USD" | "EUR" | "GBP"
): string {
  const currencyOptions: {
    [key: string]: { locale: string; currency: string };
  } = {
    USD: { locale: "en-US", currency: "USD" },
    EUR: { locale: "de-DE", currency: "EUR" },
    GBP: { locale: "en-GB", currency: "GBP" },
  };

  const { locale, currency: currencyCode } = currencyOptions[currency];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}
