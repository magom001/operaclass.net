import { permanentRedirect } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { RedirectType } from "next/navigation";
import { PageParams } from "../layout";

export default async function Page(props: PageParams) {
  const params = await props.params;

  const {
    locale
  } = params;

  unstable_setRequestLocale(locale);

  permanentRedirect(
    `/profiles/?locale=${locale}&profileType=pianist`,
    RedirectType.replace
  );
}
