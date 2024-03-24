import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

// Can be imported from a shared config
export const locales = ["en", "ru"] as const;
export const localePrefix = "always";
export type Locale = (typeof locales)[number];

export const { Link, redirect, permanentRedirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
