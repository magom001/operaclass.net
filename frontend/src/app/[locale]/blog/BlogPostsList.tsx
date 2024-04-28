"use client";

import { BlogPostType, MetaData } from "@/services/types";
import { BlogPostPreview } from "./BlogPostPreview";

interface Props {
  articles: BlogPostType[];
  meta: MetaData;
}

export function BlogPostsList({ articles }: Props) {
  return (
    <ul className="w-full grid grid-cols-1 gap-2 p-1 max-w-md mx-auto">
      {articles.map((article) => (
        <li key={article.slug}>
          <BlogPostPreview article={article} />
        </li>
      ))}
    </ul>
  );
}
