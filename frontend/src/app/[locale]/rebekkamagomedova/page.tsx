import { unstable_setRequestLocale } from "next-intl/server";
import type { PageParams } from "../layout";
import { getFounderPage } from "@/services/founder-page";
import { DynamicZoneRenderer } from "@/components/DynamicZoneRenderer";

export const dynamic = "force-dynamic";

export default async function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  const data = await getFounderPage(locale);

  if (!data?.blocks) {
    return null;
  }

  return (
    <article className="mx-auto max-w-[968px] lg:shadow-lg rounded-xl px-4 py-2 md:px-6 md:py-4 lg:my-8 lg:pb-10">
      {data.profilePicture?.attributes.url ? (
        <img
          className="rounded-full aspect-square object-cover max-w-64 mx-auto shadow-lg"
          src={data.profilePicture.attributes.url}
          alt={
            data.profilePicture.attributes.alternativeText ?? "profile picture"
          }
        />
      ) : null}
      {data.title && (
        <h1 className="font-bold text-2xl pt-4 md:text-center">{data.title}</h1>
      )}
      {data.subtitle && (
        <p className="font-thin leading-5 text-base mx-auto md:text-center md:max-w-[40ch]">
          {data.subtitle}
        </p>
      )}
      <section className="pt-4 md:pt-6 lg:pt-8 grid grid-cols-1 gap-2 md:gap-4 lg:gap-6 font-light font-sm">
        <DynamicZoneRenderer blocks={data.blocks} />
      </section>
    </article>
  );
}
