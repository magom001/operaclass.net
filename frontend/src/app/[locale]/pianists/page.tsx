import { Locale } from "@/i18n";
import { getCities } from "@/services/cities";
import { SearchParams, getPianistsPreview } from "@/services/pianists";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { PageParams } from "../layout";
import { Filters } from "./Filters";
import { PianistPreview } from "./PianistPreview";
import { NextIntlClientProvider } from "next-intl";

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

  const pianists = await getPianists(locale, searchParams);
  const cities = await getCities(locale);

  console.log("cities", cities);

  return (
    <article>
      <NextIntlClientProvider messages={messages}>
        <Filters cities={cities} />
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
