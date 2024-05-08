import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import type { PageParams } from "../layout";
import { getBlogPosts } from "@/services/blogs";
import { BlogPostsList } from "./BlogPostsList";
import { NextIntlClientProvider } from "next-intl";

export const dynamic = "force-dynamic";

export default async function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);
  const message = await getMessages({ locale });

  const { articles, meta } = await getBlogPosts({ locale });

  return (
    <NextIntlClientProvider messages={message}>
      <BlogPostsList articles={articles} meta={meta} locale={locale} />;
    </NextIntlClientProvider>
  );
}
