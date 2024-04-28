import { unstable_setRequestLocale } from "next-intl/server";
import type { PageParams } from "../layout";
import { getBlogPosts } from "@/services/blogs";
import { BlogPostsList } from "./BlogPostsList";

export default async function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  const { articles, meta } = await getBlogPosts({ locale });

  return <BlogPostsList articles={articles} meta={meta} />;
}
