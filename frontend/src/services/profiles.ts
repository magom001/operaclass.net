import qs from "qs";
import { Locale } from "@/i18n";
import { host, token } from "./config";
import { ProfilePreview, VideoLinkType } from "./types";

interface RandomProfileType {
  id: number;
  first_name: string;
  last_name: string;
  slug: string;
  city?: string;
  videos?: string;
  sex?: "m" | "f";
}

interface Params {
  locale: Locale;
  rating: number;
  profile: "pianist" | "vocal-coach";
}
export async function getRandomProfile(
  params: Params
): Promise<ProfilePreview | undefined> {
  const query = qs.stringify(params);
  const response = await fetch(`${host}/api/profiles/random/record/?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const result: RandomProfileType[] = await response.json();

  return result
    .map((x) => {
      const previews = JSON.parse(x.videos ?? "[]") as VideoLinkType[];
      const previewVideo = previews.at(0);

      return {
        id: x.id,
        fullName: `${x.first_name} ${x.last_name}`,
        slug: x.slug,
        city: x.city,
        sex: x.sex,
        previewVideo,
      } satisfies ProfilePreview;
    })
    .at(0);
}
