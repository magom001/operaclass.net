import { Link, Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { PageParams } from "../layout";
import { PianistPreview } from "./PianistPreview";
import { getPianistsPreview } from "@/services/pianists";

async function getPianists(locale: Locale) {
  return getPianistsPreview(locale);
}

export default async function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  const pianists = await getPianists(locale);

  return (
    <article>
      <ul className="p-4 grid grid-cols-1 grid-flow-row space-y-2">
        {pianists.map((p) => (
          <li key={p.id}>
            <PianistPreview pianist={p} />
          </li>
        ))}
      </ul>
    </article>
  );
}
