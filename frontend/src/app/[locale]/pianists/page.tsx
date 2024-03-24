import { permanentRedirect } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { RedirectType } from "next/navigation";
import { PageParams } from "../layout";

export default function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  permanentRedirect(
    `/profiles/?locale=${locale}&profileType=pianist`,
    RedirectType.replace
  );
}
