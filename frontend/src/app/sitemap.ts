import { locales } from "@/i18n";
import { getAllSlugs } from "@/services/profiles";
import { MetadataRoute } from "next";

const HOST = "https://operaclass.net";

function buildAlternates(
  path: string,
  host = HOST,
  langs: readonly string[] = locales
): MetadataRoute.Sitemap[number]["alternates"] {
  const languages: Record<string, string> = {
    "x-default": `${host}${path}`,
  };

  for (const lang of langs) {
    languages[lang] = `${host}/${lang}${path}`;
  }

  return {
    languages,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profileSlugs = await getAllSlugs();
  const lastModified = new Date();

  const profiles = profileSlugs.map((slug) => ({
    url: `${HOST}/profiles/${slug}/`,
    lastModified,
    alternates: buildAlternates(`/profiles/${slug}/`),
  }));

  return [
    {
      url: `${HOST}/`,
      lastModified,
      alternates: buildAlternates("/"),
    },
    {
      url: `${HOST}/join-us/`,
      lastModified,
      alternates: buildAlternates("/join-us/"),
    },
    {
      url: `${HOST}/rebekkamagomedova/`,
      lastModified,
      alternates: buildAlternates("/rebekkamagomedova/"),
    },
    {
      url: `${HOST}/feedback/`,
      lastModified,
      alternates: buildAlternates("/feedback/"),
    },
    {
      url: `${HOST}/profiles/`,
      lastModified,
      alternates: buildAlternates("/profiles/"),
    },
    ...profiles,
  ];
}
