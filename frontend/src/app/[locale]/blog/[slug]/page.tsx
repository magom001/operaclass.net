import { BlockRenderer } from "@/components/BlockRenderer";
import { ImageGallery } from "@/components/ImageGallery";
import { Locale, redirect } from "@/i18n";
import { getBlogPostBySlug } from "@/services/blogs";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import type { PageParams } from "../../layout";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: PageParams<PageProps>): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const t = await getTranslations();
  const blogPost = await getBlogPostBySlug(slug, locale);

  return {
    metadataBase: new URL("https://operaclass.net"),
    title: `OperaClass.net | ${blogPost?.attributes?.title || "404"}`,
    description:
      blogPost?.attributes?.summary ||
      blogPost?.attributes?.subtitle ||
      blogPost?.attributes?.title,
    alternates: {
      canonical: `/blog/${slug}/`,
      languages: {
        en: `/en/blog/${slug}/`,
        ru: `/ru/blog/${slug}/`,
        "x-default": `/blog/${slug}/`,
      },
    },
  };
}

interface PageProps {
  slug: string;
}

export default async function Page(props: PageParams<PageProps>) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  unstable_setRequestLocale(locale);

  const blogPost = await getBlogPostBySlug(slug, locale);

  if (!blogPost || !blogPost?.attributes) {
    return redirect("/blog/");
  }

  return (
    <article className="max-w-2xl p-2 md:p-4 mx-auto">
      <p className="flex justify-between text-xs font-extralight mb-4 opacity-50">
        <span>{blogPost.attributes.author}</span>
        <BlogPostDate date={blogPost.attributes.date} locale={locale} />
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

          if (block.__component === "generic.video-gallery") {
            return (
              <div key={index} className="py-8">
                <ul className="grid grid-cols-1 gap-2">
                  {block.videos?.map((video, index) => (
                    <li key={index}>
                      <iframe
                        title="Video content"
                        className="rounded-lg w-full max-w-full aspect-[16/9]"
                        src={`${video.url}?controls=1`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          if (block.__component === "generic.gallery") {
            return (
              <ImageGallery
                className="py-8"
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

function BlogPostDate({ date, locale }: { date: string; locale: Locale }) {
  const d = new Date(date);

  return `${d.toLocaleDateString(locale, {
    dateStyle: "long",
  })}`;
}
