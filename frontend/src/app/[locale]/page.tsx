import { unstable_setRequestLocale } from "next-intl/server";
import { PageParams } from "./layout";

export default function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  return <>TODO</>;
}
