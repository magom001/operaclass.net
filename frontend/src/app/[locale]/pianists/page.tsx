import { Locale } from "@/i18n";
import { getCities } from "@/services/cities";
import { SearchParams, getPianistsPreview } from "@/services/pianists";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { PageParams } from "../layout";
import { Filters } from "./Filters";
import { NextIntlClientProvider } from "next-intl";
import { getLanguages } from "@/services/languages";
import { getExperiences } from "@/services/experiences";
import { PianistsList } from "./PianistsList";
import { getGoals } from "@/services/goals";

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

  const [pianists, cities, languages, experiences, goals] = await Promise.all([
    getPianists(locale, searchParams),
    getCities(locale),
    getLanguages(locale),
    getExperiences(locale),
    getGoals(locale),
  ]);

  return (
    <article>
      <NextIntlClientProvider messages={messages}>
        <Filters
          cities={cities}
          experiences={experiences}
          goals={goals}
          languages={languages}
        />
      </NextIntlClientProvider>
      {pianists.data.length ? (
        <PianistsList pianists={pianists.data} pagination={pianists.meta} />
      ) : (
        <div className="p-2">{t("no-profiles-found")}</div>
      )}
    </article>
  );
}
