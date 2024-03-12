import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { PageParams } from "../../layout";
import { getPianistById } from "@/services/pianists";
import { BlockRenderer } from "@/components/BlockRenderer";
import { BioViewer } from "./BioViewer";
import { NextIntlClientProvider } from "next-intl";

interface PageProps {
  slug: string;
}

export default async function Page({
  params: { locale, slug },
}: PageParams<PageProps>) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();
  const messages = await getMessages();
  const pianist = await getPianistById(locale, slug);

  return (
    <article className="p-3 font-light text-sm relative">
      {pianist.previewVideo?.url ? (
        <iframe
          title="Pianist preview video"
          className="rounded-lg max-w-full w-full aspect-[16/9] mb-2"
          src={`${pianist.previewVideo.url}?controls=1`}
        />
      ) : null}
      <div className="sticky top-[var(--header-height)]">
        <div className="bg-white">
          <h1 className="text-3xl antialiased">{pianist.fullName}</h1>
          <p className="text-sm font-thin antialiased">{pianist.city}</p>
        </div>
        <div className="h-3 bg-gradient-to-b from-white to-transparent" />
      </div>
      <div className="mb-3">
        <h3 className="first-letter:capitalize text-lg mb-1">
          {t("Pianist.about-me")}:
        </h3>
        <NextIntlClientProvider messages={messages}>
          <BioViewer bio={pianist.bio} />
        </NextIntlClientProvider>
      </div>

      <div className="mb-3">
        <h3 className="text-lg first-letter:capitalize mb-1">
          {t("Pianist.i-speak")}:
        </h3>
        <ul className="list-disc list-inside">
          {pianist.speaks.map((language, i) => (
            <li key={i}>{language}</li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <h3 className="text-lg first-letter:capitalize mb-1">
          {t("Pianist.i-read")}:
        </h3>
        <ul className="list-disc list-inside">
          {pianist.reads.map((language, i) => (
            <li key={i}>{language}</li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <h3 className="text-lg first-letter:capitalize mb-1">
          {t("Pianist.experience")}:
        </h3>
        <ul className="list-disc list-inside">
          {pianist.experiences.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <h3 className="text-lg first-letter:capitalize mb-1">
          {t("Pianist.goals")}:
        </h3>
        <ul className="list-disc list-inside">
          {pianist.goals.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
