import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { PageParams } from "./layout";
import { RandomProfileType, getRandomProfiles } from "@/services/profiles";
import bannerImage from "./banner.jpeg";
import Image from "next/image";
import { Link } from "@/i18n";
import { FallbackImage } from "@/components/FallbackImage";
import { HTMLAttributes } from "react";
import { FounderPage, getFounderPage } from "@/services/founder-page";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export const revalidate = 3600;

export default async function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();
  const messages = await getMessages();

  const [randomProfiles, founderPage] = await Promise.all([
    getRandomProfiles({
      locale,
      rating: 0,
      profile: "pianist",
      limit: 4,
    }),
    getFounderPage(locale),
  ]);

  return (
    <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="relative col-span-1 aspect-square md:aspect-auto lg:col-span-2 shadow overflow-hidden -order-1">
        <Image
          className="absolute inset-0 object-fit h-full grayscale object-cover"
          src={bannerImage}
          alt="banner"
        />
        <div className="px-8 md:px-16 pt-24 md:pt-20 pb-16 md:pb-12 text-white absolute flex flex-col justify-between items-start inset-0 bg-gradient-to-b from-transparent to-gray-950">
          <div className="drop-shadow-xl">
            <h1 className="text-3xl font-bold">OperaClass.net</h1>
            <p>{t("Main.slogan")}</p>
          </div>
          <Link
            href="/pianists/"
            className="capitalize text-lg border rounded-full px-4 py-2 drop-shadow-xl hover:scale-[1.05] transition-transform"
          >
            {t("Header.pianists")}
          </Link>
        </div>
      </div>
      {randomProfiles.map((x, i) => (
        <RandomProfilePreview
          key={x.id}
          profile={x}
          style={{ order: `${(i + 1) * 2}` }}
        />
      ))}
      {founderPage && (
        <div className="aspect-square order-3 col-span-1 md:col-span-2 md:aspect-[2/1] lg:order-5">
          <NextIntlClientProvider messages={messages}>
            <FounderBlock data={founderPage} />
          </NextIntlClientProvider>
        </div>
      )}
      <div className="aspect-square order-5">
        <NextIntlClientProvider messages={messages}>
          <JoinOurCommunityBlock />
        </NextIntlClientProvider>
      </div>
    </article>
  );
}

function RandomProfilePreview({
  profile,
  className,
  style,
}: {
  profile: RandomProfileType;
  className?: string;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}) {
  const profileTypeString = profile.profileTypes?.map((x) => x.name).join(", ");

  return (
    <div className={`w-full aspect-square relative ${className}`} style={style}>
      <div className="w-full h-full grayscale">
        <MediaPreview profile={profile} />
      </div>
      <div className="absolute inset-0 flex flex-col justify-between p-4 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mix-blend-difference">
            {profile.firstName} {profile.lastName}
          </h1>
          <p
            title={profileTypeString}
            className="text-white text-sm mb-2 mix-blend-difference text-nowrap text-ellipsis overflow-hidden italic"
          >
            {profileTypeString}
          </p>
          <p className="text-white drop-shadow-lg mix-blend-difference">
            {[profile.city?.name, profile.city?.country?.name]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
        <div>
          <Link
            href={`/profiles/${profile.slug}/`}
            className="text-white border rounded-full px-4 py-2 mix-blend-difference"
          >
            View profile
          </Link>
        </div>
      </div>
    </div>
  );
}

function MediaPreview({ profile }: { profile: RandomProfileType }) {
  const picture = profile.pictures?.[0];

  if (picture) {
    return (
      <Image
        className="w-full h-full object-cover"
        src={picture.url}
        alt={picture.alternativeText ?? ""}
        width={picture.width}
        height={picture.height}
      />
    );
  }

  return (
    <FallbackImage sex={profile.sex} className="w-full h-full object-cover" />
  );
}

function JoinOurCommunityBlock() {
  const t = useTranslations();
  return (
    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
      <Link
        href="/join-us/"
        className="p-2 flex flex-col justify-center items-center"
      >
        <h2 className="text-2xl capitalize pb-2">{t("Header.join-us")}</h2>
        <ChevronDoubleRightIcon className="w-4 h-4" />
      </Link>
    </div>
  );
}

function FounderBlock({ data }: { data: FounderPage }) {
  const t = useTranslations();

  const profilePicture = data.profilePicture;

  if (!profilePicture) {
    return null;
  }

  return (
    <div className="w-full relative h-full">
      <Image
        src={profilePicture.attributes.url}
        alt={profilePicture.attributes.alternativeText ?? ""}
        width={profilePicture.attributes.width}
        height={profilePicture.attributes.height}
        className="w-full h-full grayscale object-cover transition-opacity"
      />
      <div className="absolute inset-0 p-4 flex flex-col items-center justify-center drop-shadow-2xl">
        <Link
          href="/rebekkamagomedova/"
          className="flex flex-col items-center justify-center"
        >
          <h3 className="text-sm md:text-lg text-white">
            {t("Main.meet-founder")}
          </h3>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {data.title}
          </h2>
          <ChevronDoubleRightIcon className="text-white w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
