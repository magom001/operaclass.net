import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { PageParams } from "../layout";

export default async function Page(props: PageParams) {
  const params = await props.params;

  const {
    locale
  } = params;

  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <article className="w-full h-full p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4 font-bold">{t("Completed.title")}</h1>
      <p className="max-w-md text-lg text-center mb-16 leading-8">
        {t("Completed.text")}
      </p>
    </article>
  );
}
