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
    <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 p-1 max-w-md lg:max-w-3xl mx-auto">
      {articles.map((article) => (
        <li key={article.slug}>
          <BlogPostPreview locale={locale} article={article} />
        </li>
      ))}
    </ul>
  );
}
