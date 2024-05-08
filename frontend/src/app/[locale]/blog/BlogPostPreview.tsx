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
    <div className="antialiased shadow-md overflow-hidden rounded-sm relative">
      <Image
        className="aspect-square object-cover grayscale brightness-50 w-full"
        src={url}
        width={width}
        height={height}
        alt={article.title}
      />
      <div className="text-white absolute inset-0 p-4 flex flex-col justify-between">
        <div className="text-xs flex justify-between">
          <span>{article.author}</span>
          <span>
            {new Date(article.date).toLocaleDateString(locale, {
              dateStyle: "long",
            })}
          </span>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2 has-[+h3]:mb-0">
            {article.title}
          </h2>
          {article.subtitle ? (
            <h3 className="text-sm font-semibold mb-2">{article.subtitle}</h3>
          ) : null}
          <p className="text-xs line-clamp-3 italic">{article.summary}</p>
          <Link
            className="text-xs first-letter:capitalize inline-block"
            href={`/blog/${article.slug}`}
          >
            {t("Blog.read-more")}&#8230;
          </Link>
        </div>
      </div>
    </div>
  );
}
