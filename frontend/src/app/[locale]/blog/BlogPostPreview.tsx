"use client";

import { BlogPostType } from "@/services/types";
import Image from "next/image";

import stub1 from "./stub1.jpg";
import stub2 from "./stub2.jpg";
import stub3 from "./stub3.jpg";
import stub4 from "./stub4.jpg";
import { Link, Locale } from "@/i18n";
import { useTranslations } from "next-intl";

const stubs = [stub1, stub2, stub3, stub4];

interface Props {
  locale: Locale;
  article: BlogPostType;
}

export function BlogPostPreview({ article, locale }: Props) {
  const t = useTranslations();
  const stub = stubs[article.slug.length % stubs.length];
  let url = stub.src;
  let width = stub.width;
  let height = stub.height;

  if (article.coverImage?.data) {
    url = article.coverImage.data.attributes.url;
    width = article.coverImage.data.attributes.width;
    height = article.coverImage.data.attributes.height;
  }

  return (
    <div className="antialiased overflow-hidden h-full">
      <Image
        className="aspect-[16/9] object-cover w-full"
        src={url}
        width={width}
        height={height}
        alt={article.title}
      />
      <Link href={`/blog/${article.slug}`}>
        <div className="p-4 pb-6">
          <h2 className="font-bold text-lg mb-2 has-[+h3]:mb-0">
            {article.title}
          </h2>
          {article.subtitle ? (
            <h3 className="text-sm font-semibold mb-2">{article.subtitle}</h3>
          ) : null}
          <p className="text-xs line-clamp-3 italic">
            {article.summary}
            <span className="inline-block font-semibold first-letter:capitalize">
              {t("Blog.read-more")}&#8230;
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
