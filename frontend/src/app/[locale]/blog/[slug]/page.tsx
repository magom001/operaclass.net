import { unstable_setRequestLocale } from "next-intl/server";
import type { PageParams } from "../../layout";
import { getBlogPostBySlug } from "@/services/blogs";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ImageGallery } from "@/components/ImageGallery";

interface PageProps {
  slug: string;
}

export default async function Page({
  params: { locale, slug },
}: PageParams<PageProps>) {
  unstable_setRequestLocale(locale);

  const blogPost = await getBlogPostBySlug(slug, locale);

  if (blogPost === null || blogPost?.attributes === undefined) {
    return <div>Not found</div>;
  }

  return (
    <article className="max-w-2xl p-2 md:p-4 mx-auto">
      <p className="flex justify-between text-xs font-extralight mb-4 opacity-50">
        <span>{blogPost.attributes.author}</span>
        <BlogPostDate date={blogPost.attributes.date} />
      </p>
      <h1 className="text-3xl font-semibold mb-8 has-[+h2]:mb-2">
        {blogPost.attributes.title}
      </h1>
      {blogPost.attributes.subtitle ? (
        <h2 className="mb-8 text-xl">{blogPost?.attributes.subtitle}</h2>
      ) : null}

      <section className="text-neutral-700 font-light">
        {blogPost.attributes.content.map((block, index) => {
          if (block.__component === "generic.blog-content") {
            return <BlockRenderer key={index} blocks={block.text} />;
          }

          if (block.__component === "generic.gallery") {
            return (
              <ImageGallery
                className="my-8"
                key={index}
                images={block.images.data}
              />
            );
          }

          return null;
        })}
      </section>
    </article>
  );
}

function BlogPostDate({ date }: { date: string }) {
  const d = new Date(date);

  return `${d.toLocaleDateString()}`;
}
