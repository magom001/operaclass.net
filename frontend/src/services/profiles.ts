import qs from "qs";
import { Locale } from "@/i18n";
import { host, token } from "./config";
import { ProfileTypeType, StrapiMediaType, VideoLinkType } from "./types";

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
