import { use } from "react";
import "../globals.css";
import { Locale, locales } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Header from "../../components/Header";
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export interface PageParams<T = {}, S = {}> {
  searchParams: Promise<S>;
  params: Promise<T & {
    locale: Locale;
  }>;
}

export default function LocaleLayout(
  props: {
    children: React.ReactNode;
  } & PageParams
) {
  const params = use(props.params);

  const {
    locale
  } = params;

  const {
    children
  } = props;

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
        <main className="pt-[64px] bg-[rgb(var(--background-rgb))]">
          {children}
        </main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-CSF32HY45N" />
      <GoogleTagManager gtmId="GTM-WVPDL63H" />
    </html>
  );
}
