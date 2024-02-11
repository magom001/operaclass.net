import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface PageProps {
  params: {
    locale: "en" | "ru";
  };
}

export default function Page({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <h1>Hi from second page!</h1>
      <Link href={`/${locale}`}>second page</Link>
    </>
  );
}
