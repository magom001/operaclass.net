import { locales } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  // `locales` is just an array of all of
  // our supported locales: `["en-US", "ar-EG"]`
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
