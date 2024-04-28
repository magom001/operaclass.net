import { getAllSlugs } from "@/services/profiles";
import { MetadataRoute } from "next";

const HOST = "https://operaclass.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profileSlugs = await getAllSlugs();
  const lastModified = new Date();

  const profiles = profileSlugs.map((slug) => ({
    url: `${HOST}/profiles/${slug}`,
    lastModified,
  }));

  return [
    {
      url: HOST,
      lastModified,
      // alternates: {
      //   languages: {
      //     es: "https://acme.com/es",
      //     de: "https://acme.com/de",
      //   },
      // },
    },
    {
      url: `${HOST}/join-us`,
      lastModified,
      // alternates: {
      //   languages: {
      //     es: "https://acme.com/es/about",
      //     de: "https://acme.com/de/about",
      //   },
      // },
    },
    {
      url: `${HOST}/feedback`,
      lastModified,
      // alternates: {
      //   languages: {
      //     es: "https://acme.com/es/blog",
      //     de: "https://acme.com/de/blog",
      //   },
      // },
    },
    {
      url: `${HOST}/profiles`,
      lastModified,
      // alternates: {
      //   languages: {
      //     es: "https://acme.com/es/blog",
      //     de: "https://acme.com/de/blog",
      //   },
      // },
    },
    ...profiles,
  ];
}
