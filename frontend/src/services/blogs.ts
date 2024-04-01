import qs from "qs";
import { Locale } from "@/i18n";
import { host, token } from "./config";
import { BlogPostType, MetaData, SingleType } from "./types";

interface Params {
  locale: Locale;
}

export async function getBlogPosts(params: Params) {
  const query = qs.stringify(params);
  const response = await fetch(`${host}/api/blogs/?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const result: { data: BlogPostType[]; meta: MetaData } =
    await response.json();

  return result;
}

export async function getBlogPostBySlug(slug: string, locale: Locale) {
  const query = qs.stringify({ locale });
  const response = await fetch(`${host}/api/blogs/slug/${slug}/?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const result: SingleType<BlogPostType> & { meta: MetaData } =
    await response.json();

  return result.data;
}
