import { permanentRedirect } from "@/i18n";
import { setRequestLocale } from "next-intl/server";
import { RedirectType } from "next/navigation";
import { PageParams } from "../layout";

export default async function Page(props: PageParams) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);

  permanentRedirect(
    { href: { pathname: "/rebekkamagomedova/" }, locale }, RedirectType.replace);
}
