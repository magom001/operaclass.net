import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

// Can be imported from a shared config
export const locales = ["en", "ru"] as const;
export const localePrefix = "always";
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  defaultLocale: 'en',
  locales,
  localePrefix,
});

export const { Link, redirect, permanentRedirect, usePathname, useRouter } =
  createNavigation(routing);

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
