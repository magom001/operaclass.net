import { Locale } from "@/i18n";
import { getCities } from "@/services/cities";
import { SearchParams, getPianistsPreview } from "@/services/pianists";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { PageParams } from "../layout";
import { Filters } from "./Filters";
import { PianistPreview } from "./PianistPreview";
import { NextIntlClientProvider } from "next-intl";
import { getLanguages } from "@/services/languages";

async function getPianists(locale: Locale, searchParams: SearchParams) {
  return getPianistsPreview(locale, searchParams);
}

export default async function Page({
  params: { locale },
  searchParams,
}: PageParams<{}, SearchParams>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  console.log(messages["Common"]);

  const [pianists, cities, languages] = await Promise.all([
    getPianists(locale, searchParams),
    getCities(locale),
    getLanguages(locale),
  ]);

  return (
    <article>
      <NextIntlClientProvider messages={messages}>
        <Filters cities={cities} languages={languages} />
      </NextIntlClientProvider>
      <ul className="p-2 grid grid-cols-1 landscape:grid-cols-2 grid-flow-row space-y-2 space-x-1">
        {pianists.map((p) => (
          <li key={p.id}>
            <PianistPreview pianist={p} />
          </li>
        ))}
      </ul>
    </article>
  );
}
