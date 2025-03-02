import { getBlogPosts } from "@/services/blogs";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import type { PageParams } from "../layout";
import { BlogPostsList } from "./BlogPostsList";

export const revalidate = 60;

export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const t = await getTranslations();
  return {
    metadataBase: new URL("https://operaclass.net"),
    title: `OperaClass.net | ${t("Blog.title")}`,
    description: t("Blog.description"),
    alternates: {
      canonical: "/blog/",
      languages: {
        en: "/en/blog/",
        ru: "/ru/blog/",
        "x-default": "/blog/",
      },
    },
  };
}

export default async function Page(props: PageParams) {
  const params = await props.params;

  const {
    locale
  } = params;

  unstable_setRequestLocale(locale);
  const message = await getMessages({ locale });

  const { articles, meta } = await getBlogPosts({ locale });

  return (
    <NextIntlClientProvider messages={message}>
      <BlogPostsList articles={articles} meta={meta} locale={locale} />;
    </NextIntlClientProvider>
  );
}
