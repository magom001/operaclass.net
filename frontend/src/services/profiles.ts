import { Locale } from "@/i18n";
import qs from "qs";
import { host, token } from "./config";
import {
  CollectionType,
  ProfileTypeType,
  StrapiMediaType,
  VideoLinkType,
} from "./types";

export interface RandomProfileType {
  id: number;
  firstName: string;
  lastName: string;
  slug: string;
  sex: "m" | "f";
  videos?: VideoLinkType[];
  profileTypes?: ProfileTypeType[];
  city?: {
    name: string;
    country?: {
      name: string;
    };
  };
  pictures?: StrapiMediaType["attributes"][];
}
interface Params {
  locale: Locale;
  rating: number;
  profile: "pianist" | "vocal-coach";
  limit?: number;
}
export async function getRandomProfiles(
  params: Params
): Promise<RandomProfileType[]> {
  const query = qs.stringify(params);
  const response = await fetch(`${host}/api/profiles/random/record/?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const result: RandomProfileType[] = await response.json();

  return result;
}

// TODO: THIS WILL RETURN ONLY 100 SLUGS
export async function getAllSlugs(): Promise<string[]> {
  const query = qs.stringify({ limit: -1, locale: "ru", fields: ["slug"] });
  const response = await fetch(`${host}/api/profiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const result: CollectionType<{ slug: string }> = await response.json();

  return result.data?.map((r) => r.attributes.slug) ?? [];
}
