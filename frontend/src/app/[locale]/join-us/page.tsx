import { NextIntlClientProvider, useTranslations } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import Image from "next/image";
import type { PageParams } from "../layout";
import artOfOperaImage from "./images/art-of-opera.jpeg";
import floatingOperaImage from "./images/floating-opera.jpeg";
import paypalIcon from "./images/paypal.svg";
import { AdsBlock } from "./AdsBlock";

const Points = [
  [
    "for-pianists",
    "for-pianists-description",
    ["application-form", "for-pianists-form-url"],
  ],
  [
    "for-coaches",
    "for-coaches-description",
    ["application-form", "for-coaches-form-url"],
  ],
  [
    "tell-about-us",
    "tell-about-us-description",
    ["contact-us", "contact-us-mailto"],
  ],
] as const;

export default async function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <article className="mx-auto max-w-screen-lg px-2 lg:px-6 py-4 lg:py-12 text-center grid grid-cols-1 gap-y-8">
      <section>
        <h1 className="text-3xl lg:text-4xl mb-4 text-center font-bold px-4">
          {t("JoinUs.title")}
        </h1>
        <p className="font-thin lg:text-xl max-w-[50ch] mx-auto">
          {t("JoinUs.subtitle")}
        </p>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-16 my-16">
          {Points.map(([key, description, [linkKey, linkUrlKey]], i) => (
            <li
              key={key}
              className={`grid grid-rows-[auto_auto_1fr_auto] px-2 before:mx-auto before:shadow-2xl before:content-[attr(data-counter)] text-xl before:flex before:items-center before:justify-center before:w-20 before:h-20 before:text-gray-100 before:bg-gradient-to-br before:from-gray-600 before:to-gray-950 before:rounded-full`}
              data-counter={++i}
            >
              <h2 className="text-xl font-bold first-letter:capitalize pt-8 pb-4">
                {t(`JoinUs.${key}`)}
              </h2>
              <p className="font-extralight text-sm">
                {t(`JoinUs.${description}`)}
              </p>
              <a
                href={t(`JoinUs.${linkUrlKey}`)}
                className="first-letter:capitalize text-sm text-blue-600 mt-8"
                target="_blank"
                rel="noreferrer"
              >
                {t(`JoinUs.${linkKey}`)}
              </a>
            </li>
          ))}
        </ol>
      </section>
      <NextIntlClientProvider messages={messages}>
        <SupportUs />
      </NextIntlClientProvider>
      <NextIntlClientProvider messages={messages}>
        <OurFriends />
      </NextIntlClientProvider>
    </article>
  );
}

function SupportUs() {
  const t = useTranslations();

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-2xl first-letter:capitalize font-semibold mb-2 md:mb-6">
        {t("SupportUs.title")}
      </h2>
      <p className="text-sm font-light max-w-xl">
        {t("SupportUs.description")}
      </p>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 py-8">
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=3Y9GM8XH2PGHS"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="h-[50px] m-auto aspect-square object-contain"
            src={paypalIcon.src}
            alt="Paypal"
            width={paypalIcon.width}
            height={paypalIcon.height}
          />
        </a>
        <div className="max-w-xs overflow-hidden flex justify-center">
          <iframe
            title="Yoomoney"
            src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=11LU2K7SFHV.240324&"
            width="330"
            height="50"
          />
        </div>
        <div className="text-lg first-letter:capitalize md:col-span-2">
          <AdsBlock />
        </div>
      </div>
    </section>
  );
}

const OUR_FRIENDS = [
  {
    titleKey: "OurFriends.art-of-opera",
    imageUrl: artOfOperaImage.src,
    link: "https://vk.com/artofopera",
    width: artOfOperaImage.width,
    height: artOfOperaImage.height,
  },
  {
    titleKey: "OurFriends.floating-opera",
    imageUrl: floatingOperaImage.src,
    link: "https://t.me/pensierr",
    width: floatingOperaImage.width,
    height: floatingOperaImage.height,
  },
];

function OurFriends() {
  const t = useTranslations();
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-2 md:mb-6">
        {t("OurFriends.title")}
      </h2>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {OUR_FRIENDS.map(({ titleKey, imageUrl, link, width, height }) => (
          <li
            key={titleKey}
            className="flex flex-col items-center shadow-md p-2 rounded-md"
          >
            <a href={link} target="_blank" rel="noreferrer h-full w-full">
              <Image
                src={imageUrl}
                alt={t(titleKey)}
                width={width}
                height={height}
                className="w-32 h-32 object-cover rounded-full filter grayscale"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
