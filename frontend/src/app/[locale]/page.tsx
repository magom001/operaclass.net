import { Link } from "@/i18n";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import { unstable_setRequestLocale } from "next-intl/server";

interface PageProps {
  params: {
    locale: "en" | "ru";
  };
}

export default function Page({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      <p>{t("english")}</p>
      <Link href={`/pianists`}>Pianists</Link>
      <div>
        <LanguageSwitcher />
      </div>
    </>
  );
}
