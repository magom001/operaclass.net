"use client";

import { BlogPostType, MetaData } from "@/services/types";
import { BlogPostPreview } from "./BlogPostPreview";
import { Locale } from "@/i18n";

interface Props {
  articles: BlogPostType[];
  meta: MetaData;
  locale: Locale;
}

export function BlogPostsList({ articles, locale }: Props) {
  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 md:[&>li:first-child]:col-span-2 gap-x-8 gap-2 p-1 max-w-md md:max-w-4xl lg:max-w-5xl mx-auto">
      {articles.map((article) => (
        <li key={article.slug}>
          <BlogPostPreview locale={locale} article={article} />
        </li>
      ))}
    </ul>
  );
}
