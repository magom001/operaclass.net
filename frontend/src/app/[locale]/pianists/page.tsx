import { Locale } from "@/i18n";
import { getCities } from "@/services/cities";
import { SearchParams, getPianistsPreview } from "@/services/pianists";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { PageParams } from "../layout";
import { Filters, FiltersMobile, FiltersModal } from "./Filters";
import { NextIntlClientProvider } from "next-intl";
import { getLanguages } from "@/services/languages";
import { getExperiences } from "@/services/experiences";
import { PianistsList } from "./PianistsList";
import { getGoals } from "@/services/goals";
import { getProfileTypes } from "@/services/profile-types";

async function getPianists(locale: Locale, searchParams: SearchParams) {
  return getPianistsPreview(locale, searchParams);
}

export default async function Page({
  params: { locale },
  searchParams,
}: PageParams<{}, SearchParams>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("Pianists");

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
        <PianistsList
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
            className="sticky top-[var(--header-height)] max-h-[calc(100vh-var(--header-height)-var(--footer-height))] transition-all"
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
