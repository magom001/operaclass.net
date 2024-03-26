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

export const dynamic = "force-dynamic";
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
        <div className="px-8 md:px-16 pt-12 md:pt-20 pb-16 md:pb-12 text-white absolute flex flex-col justify-between items-start inset-0 bg-gradient-to-b from-transparent to-neutral-950">
          <div className="drop-shadow-xl">
            <h1 className="text-3xl font-bold">OperaClass.net</h1>
            <p className="font-semibold">{t("Main.slogan")}</p>
          </div>
          <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2">
            <Link
              href="/pianists/"
              className="capitalize text-lg border rounded-md px-4 py-2 drop-shadow-xl hover:scale-[1.05] transition-transform"
            >
              {t("Main.pianists")}&raquo;
            </Link>
            <Link
              href="/vocal-coaches/"
              className="capitalize text-lg border rounded-md px-4 py-2 drop-shadow-xl hover:scale-[1.05] transition-transform"
            >
              {t("Main.vocal-coaches")}&raquo;
            </Link>
          </div>
        </div>
      </div>
      {randomProfiles.map((x, i) => (
        <NextIntlClientProvider key={x.id} messages={messages}>
          <RandomProfilePreview
            profile={x}
            style={{ order: `${(i + 1) * 2}` }}
          />
        </NextIntlClientProvider>
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
  const t = useTranslations();
  const profileTypeString = profile.profileTypes?.map((x) => x.name).join(", ");

  return (
    <div className={`w-full aspect-square relative ${className}`} style={style}>
      <div className="w-full h-full grayscale">
        <MediaPreview profile={profile} />
      </div>
      <Link
        href={`/profiles/${profile.slug}`}
        className="text-gray-100 antialiased absolute inset-0 flex flex-col justify-between hover:from-neutral-900 transition-all px-6 py-8 md:px-12 md:py-8 bg-gradient-to-b from-neutral-950 to-transparent"
      >
        <div>
          <h1 className="text-3xl font-bold drop-shadow-lg">
            {`${profile.firstName} ${profile.lastName}`}
          </h1>
          <p
            title={profileTypeString}
            className="text-sm mb-2 text-nowrap text-ellipsis overflow-hidden italic drop-shadow-lg"
          >
            {profileTypeString}
          </p>
          <p className="drop-shadow-lg">
            {[profile.city?.name, profile.city?.country?.name]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
        <div className="text-lg text-right text-neutral-900 px-4 py-2 font-bold first-letter:capitalize drop-shadow-lg rounded-md self-end bg-neutral-100 opacity-80 shadow-md">
          {t("Main.view-profile")}&raquo;
        </div>
      </Link>
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
    <Link
      href="/join-us"
      className="w-full h-full flex items-center justify-center text-neutral-900 bg-gradient-to-br from-gray-100 to-neutral-400 group"
    >
      <span className="p-8 flex flex-col justify-center items-center group-hover:scale-[1.05] transition-all">
        <h2 className="text-xl capitalize drop-shadow-2xl font-bold">
          {t("Header.join-us")} &raquo;
        </h2>
      </span>
    </Link>
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
      <Link
        href="/rebekkamagomedova/"
        className="flex flex-col items-start justify-between absolute inset-0 px-6 py-8 md:px-12 md:py-8 drop-shadow-2xl"
      >
        <div className="text-gray-100 antialiased">
          <h3 className="text-sm md:text-lg mb-3">
            {t("Main.meet-founder")}&raquo;
          </h3>
          <h2 className="text-2xl md:text-4xl font-bold">{data.title}</h2>
          <p className="italic first-letter:capitalize">{data.subtitle}</p>
        </div>
      </Link>
    </div>
  );
}
