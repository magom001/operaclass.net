import { Locale } from "@/i18n";
import { getCities } from "@/services/cities";
import { getExperiences } from "@/services/experiences";
import { getGoals } from "@/services/goals";
import { getLanguages } from "@/services/languages";
import { SearchParams, getPianistsPreview } from "@/services/pianists";
import { getProfileTypes } from "@/services/profile-types";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { PageParams } from "../layout";
import { Filters, FiltersMobile, FiltersModal } from "./Filters";
import { ProfilesList } from "./ProfilesList";

async function getPianists(locale: Locale, searchParams: SearchParams) {
  return getPianistsPreview(locale, searchParams);
}

export async function generateMetadata({
  params: { locale },
}: PageParams): Promise<Metadata> {
  const t = await getTranslations();

  return {
    metadataBase: new URL("https://operaclass.net"),
    title: `OperaClass.net | ${t("Profiles.profiles")}`,
    description: t("Profiles.description"),
    alternates: {
      canonical: "/profiles/",
      languages: {
        en: "/en/profiles/",
        ru: "/ru/profiles/",
        "x-default": "/profiles/",
      },
    },
  };
}

export default async function Page({
  params: { locale },
  searchParams,
}: PageParams<{}, SearchParams>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("Profiles");

  const [pianists, cities, languages, experiences, goals, profileTypes] =
    await Promise.all([
      getPianists(locale, searchParams),
      getCities(locale),
      getLanguages(locale),
      getExperiences(locale),
      getGoals(locale),
      getProfileTypes(locale),
    ]);

  return (
    <article className="grid grid-cols-1 lg:grid-cols-[1fr_var(--filters-aside-width)] min-h-full">
      {pianists.data.length ? (
        <ProfilesList
          pianists={pianists.data}
          pagination={pianists.meta}
          locale={locale}
        />
      ) : (
        <div className="p-2 flex items-center justify-center">
          <h1 className="text-2xl mb-8 font-bold">{t("no-profiles-found")}</h1>
        </div>
      )}
      <NextIntlClientProvider messages={messages}>
        <aside className="hidden lg:block shadow-lg static">
          <Filters
            profileTypes={profileTypes}
            cities={cities}
            experiences={experiences}
            goals={goals}
            languages={languages}
            className="sticky top-[var(--header-height)] max-h-[calc(100dvh-var(--header-height)-var(--footer-height))] transition-all"
          />
        </aside>
        <FiltersMobile
          profileTypes={profileTypes}
          cities={cities}
          experiences={experiences}
          goals={goals}
          languages={languages}
        />
      </NextIntlClientProvider>
    </article>
  );
}
