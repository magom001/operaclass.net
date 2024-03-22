import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { PageParams } from "./layout";
import { getRandomProfile } from "@/services/profiles";
import { PianistPreview } from "./pianists/PianistPreview";
import bannerImage from "./banner.jpeg";
import Image from "next/image";
import { Link } from "@/i18n";

export const revalidate = 3600;

export default async function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();

  const randomPianist = await getRandomProfile({
    locale,
    rating: 0,
    profile: "pianist",
  });

  return (
    <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className="relative col-span-1 aspect-square md:aspect-auto lg:col-span-2 rounded-md shadow overflow-hidden">
        <Image
          className="absolute inset-0 object-fit h-full object-cover"
          src={bannerImage}
          alt="banner"
        />
        <div className="px-16 pt-24 md:pt-20 pb-16 md:pb-12 text-white absolute flex flex-col justify-between items-start inset-0 bg-gradient-to-b from-transparent to-gray-950">
          <div className="drop-shadow-xl">
            <h1 className="text-3xl font-bold">OperaClass.net</h1>
            <p>{t("Main.slogan")}</p>
          </div>
          <Link
            href="/pianists"
            className="capitalize text-lg border rounded-full px-4 py-2 drop-shadow-xl hover:scale-[1.05] transition-transform"
          >
            {t("Header.pianists")}
          </Link>
        </div>
      </div>
      {randomPianist ? (
        <div>
          <PianistPreview pianist={randomPianist} />
        </div>
      ) : null}
    </article>
  );
}
