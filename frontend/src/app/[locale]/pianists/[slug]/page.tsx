import { unstable_setRequestLocale } from "next-intl/server";
import { PageParams } from "../../layout";

interface PageProps {
  slug: string;
}

export default function Page({
  params: { locale, slug },
}: PageParams<PageProps>) {
  unstable_setRequestLocale(locale);

  return <div>{slug}</div>;
}
