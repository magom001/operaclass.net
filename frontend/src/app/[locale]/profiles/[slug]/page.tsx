import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { PageParams } from "../../layout";
import { getPianistBySlug } from "@/services/pianists";
import { BioViewer } from "./BioViewer";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { ContactInfo } from "./ContactInfo";
import { Breadcrumbs } from "./Breadcrumbs";
import { ShareButton } from "./ShareButton";
import Image from "next/image";

interface PageProps {
  slug: string;
}

// TODO: Implement SSG
// export async function generateStaticParams({
//   params: { locale },
// }: {
//   params: { locale: Locale };
// }) {
//   return [{ slug: "1" }];
// }

export default async function Page({
  params: { locale, slug },
}: PageParams<PageProps>) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();
  const messages = await getMessages();
  const pianist = await getPianistBySlug(locale, slug);

  if (!pianist) {
    return (
      <NextIntlClientProvider messages={messages}>
        <NotFound />
      </NextIntlClientProvider>
    );
  }

  const picture = pianist.pictures.at(0);
  const profileTypesString = pianist.profileTypes
    ?.map((type) => type.name)
    .join(", ");

  return (
    <article className="p-3 font-light text-sm relative grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-x-8">
      <NextIntlClientProvider messages={messages}>
        <Breadcrumbs
          className="col-span-1 lg:col-span-2"
          name={pianist.fullName}
        />
      </NextIntlClientProvider>
      <section>
        {pianist.previewVideo?.url ? (
          <iframe
            title="Pianist preview video"
            className="rounded-lg max-w-full w-full aspect-[16/9] mb-2"
            src={`${pianist.previewVideo.url}?controls=1`}
          />
        ) : null}
        {picture && !pianist.previewVideo?.url && (
          <Image
            className="rounded-full object-cover w-[90%] max-w-64 md:w-[50%] aspect-square mx-auto shadow-md my-4 mb-6"
            src={picture.url}
            width={picture.width}
            height={picture.height}
            alt={picture.name}
          />
        )}
        {pianist.bio && pianist.bio.length > 0 && (
          <div className="mb-3 hidden lg:block">
            <h3 className="first-letter:capitalize text-lg mb-1 font-semibold">
              {t("Pianist.about-me")}:
            </h3>
            <NextIntlClientProvider messages={messages}>
              <BioViewer bio={pianist.bio} />
            </NextIntlClientProvider>
          </div>
        )}
      </section>
      <section>
        <div className="sticky lg:static top-[var(--header-height)] z-10">
          <div className="bg-white">
            <h1 className="text-3xl antialiased font-bold drop-shadow-lg flex items-center gap-2">
              {pianist.fullName}
              <ShareButton
                title={pianist.fullName}
                text={`${pianist.fullName}\n\n${profileTypesString}\n\n`}
              />
            </h1>
            <p className="overflow-hidden italic">{profileTypesString}</p>
            <p className="text-sm font-thin antialiased">
              {[pianist.city, pianist.country].filter(Boolean).join(", ")}
            </p>
          </div>
          <div className="h-3 bg-gradient-to-b from-white to-transparent" />
        </div>

        {pianist.contacts && pianist.contacts.length > 0 && (
          <div className="mb-3">
            <ContactInfo contacts={pianist.contacts} />
          </div>
        )}

        {pianist.bio && pianist.bio.length > 0 && (
          <div className="mb-3 lg:hidden">
            <h3 className="first-letter:capitalize text-lg mb-1 font-semibold">
              {t("Pianist.about-me")}:
            </h3>
            <NextIntlClientProvider messages={messages}>
              <BioViewer bio={pianist.bio} />
            </NextIntlClientProvider>
          </div>
        )}

        {pianist.speaks && pianist.speaks.length > 0 && (
          <div className="mb-3">
            <h3 className="text-lg first-letter:capitalize mb-1 font-semibold">
              {t("Pianist.i-speak")}:
            </h3>
            <ul className="list-disc list-inside">
              {pianist.speaks.map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
          </div>
        )}

        {pianist.reads && pianist.reads.length > 0 && (
          <div className="mb-3">
            <h3 className="text-lg first-letter:capitalize mb-1 font-semibold">
              {t("Pianist.i-read")}:
            </h3>
            <ul className="list-disc list-inside">
              {pianist.reads.map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
          </div>
        )}

        {pianist.experiences && pianist.experiences.length > 0 && (
          <div className="mb-3">
            <h3 className="text-lg first-letter:capitalize mb-1 font-semibold">
              {t("Pianist.experience")}:
            </h3>
            <ul className="list-disc list-inside">
              {pianist.experiences.map((entry, i) => (
                <li key={i}>{entry}</li>
              ))}
            </ul>
          </div>
        )}

        {pianist.goals && pianist.goals.length > 0 && (
          <div className="mb-3">
            <h3 className="text-lg first-letter:capitalize mb-1 font-semibold">
              {t("Pianist.goals")}:
            </h3>
            <ul className="list-disc list-inside">
              {pianist.goals.map((entry, i) => (
                <li key={i}>{entry}</li>
              ))}
            </ul>
          </div>
        )}

        {pianist.recommendations && pianist.recommendations.length > 0 && (
          <div className="mb-3">
            <h3 className="text-lg first-letter:capitalize mb-1 font-semibold">
              {t("Pianist.recommendations")}:
            </h3>
            <ul className="list-disc list-inside">
              {pianist.recommendations.map((entry, i) => (
                <li key={i}>
                  <a
                    href={entry.profileLink}
                    className="underline text-blue-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {entry.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </article>
  );
}

function NotFound() {
  const t = useTranslations();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1 className="text-3xl first-letter:capitalize font-extrabold text-gray-900">
        {t("Common.not-found")}
      </h1>
    </div>
  );
}
