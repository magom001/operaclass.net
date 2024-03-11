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
import { PianistPreview } from "./PianistPreview";
import { NextIntlClientProvider } from "next-intl";
import { getLanguages } from "@/services/languages";
import { getExperiences } from "@/services/experiences";

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
  console.log(messages["Common"]);

  const [pianists, cities, languages, experiences] = await Promise.all([
    getPianists(locale, searchParams),
    getCities(locale),
    getLanguages(locale),
    getExperiences(locale),
  ]);

  return (
    <article>
      <NextIntlClientProvider messages={messages}>
        <Filters
          cities={cities}
          languages={languages}
          experiences={experiences}
        />
      </NextIntlClientProvider>
      {pianists.length ? (
        <ul className="p-2 grid grid-cols-1 landscape:grid-cols-2 grid-flow-row space-y-2 space-x-1">
          {pianists.map((p) => (
            <li key={p.id}>
              <PianistPreview pianist={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-2">{t("no-profiles-found")}</div>
      )}
    </article>
  );
}
