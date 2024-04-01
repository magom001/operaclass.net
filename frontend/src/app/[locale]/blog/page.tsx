import { unstable_setRequestLocale } from "next-intl/server";
import type { PageParams } from "../layout";
import { getBlogPosts } from "@/services/blogs";

export default async function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  const blogPosts = await getBlogPosts({ locale });

  return <div>{JSON.stringify(blogPosts)}</div>;
}
