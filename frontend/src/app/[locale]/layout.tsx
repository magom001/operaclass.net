import "../globals.css";
import { locales } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Header from "../../components/Header";
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import { Metadata } from "next";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params: { locale },
}: PageParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
  };
}

export function generateStaticParams() {
  // `locales` is just an array of all of
  // our supported locales: `["en-US", "ar-EG"]`
  return locales.map((locale) => ({ locale }));
}

export interface PageParams<T = {}> {
  params: T & {
    locale: (typeof locales)[number];
  };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
} & PageParams) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className="grid grid-rows-main">
        <NextIntlClientProvider
          messages={messages["Header"] as AbstractIntlMessages}
        >
          <Header />
        </NextIntlClientProvider>
        <main className="pt-[64px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
