import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import type { PageParams } from "../layout";
import artOfOperaImage from "./images/art-of-opera.jpeg";
import floatingOperaImage from "./images/floating-opera.jpeg";
import { NextIntlClientProvider, useTranslations } from "next-intl";

const Points = [
  [
    "for-students",
    "for-students-description",
    ["application-form", "https://forms.gle/qH4BKBuX7BfRVWJm7"],
  ],
  [
    "for-teachers",
    "for-teachers-description",
    ["contact-us", "mailto:operaclassaz@gmail.com"],
  ],
  [
    "for-media",
    "for-media-description",
    ["contact-us", "mailto:operaclassaz@gmail.com"],
  ],
  [
    "support-us",
    "support-us-description",
    ["contact-us", "mailto:operaclassaz@gmail.com"],
  ],
] as const;

export default async function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <article className="mx-auto max-w-screen-lg px-2 lg:px-6 py-4 lg:py-12 text-center">
      <h1 className="text-3xl lg:text-4xl mb-4 text-center font-bold px-4">
        {t("JoinUs.title")}
      </h1>
      <p className="font-thin lg:text-xl max-w-[50ch] mx-auto">
        {t("JoinUs.subtitle")}
      </p>
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 my-16">
        {Points.map(([key, description, [linkKey, link]], i) => (
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
              href={link}
              className="first-letter:capitalize text-sm text-blue-600 mt-8"
              target="_blank"
              rel="noreferrer"
            >
              {t(`JoinUs.${linkKey}`)}
            </a>
          </li>
        ))}
      </ol>
      <section>
        <NextIntlClientProvider messages={messages}>
          <OurFriends />
        </NextIntlClientProvider>
      </section>
    </article>
  );
}

const OUR_FRIENDS = [
  {
    titleKey: "OurFriends.art-of-opera",
    imageUrl: artOfOperaImage.src,
    link: "https://vk.com/artofopera",
  },
  {
    titleKey: "OurFriends.floating-opera",
    imageUrl: floatingOperaImage.src,
    link: "https://t.me/pensierr",
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
        {OUR_FRIENDS.map(({ titleKey, imageUrl, link }) => (
          <li
            key={titleKey}
            className="flex flex-col items-center shadow-md p-2 rounded-md"
          >
            <a href={link} target="_blank" rel="noreferrer h-full w-full">
              <img
                src={imageUrl}
                alt={titleKey}
                className="w-32 h-32 object-cover rounded-full filter grayscale"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
