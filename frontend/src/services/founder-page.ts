import qs from "qs";
import { Locale } from "@/i18n";
import { host, token } from "./config";
import type {
  DynamicZoneBlock,
  StrapiMediaType,
} from "@/components/DynamicZoneRenderer";

export interface FounderPage {
  title?: string;
  subtitle?: string;
  profilePicture?: StrapiMediaType;
  blocks?: DynamicZoneBlock[];
}

interface ResponseData {
  id: number;
  attributes: {
    title?: string;
    subtitle?: string;
    profilePicture?: {
      data?: StrapiMediaType;
    };
    blocks?: DynamicZoneBlock[];
  };
}

export async function getFounderPage(
  locale: Locale
): Promise<FounderPage | null> {
  const query = qs.stringify({
    locale,
    populate: {
      profilePicture: {
        populate: "*",
      },
      blocks: {
        populate: "*",
      },
    },
  });

  const response = await fetch(
    `${host}/api/founder-page?locale=${locale}&${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const { data }: { data: ResponseData | null } = await response.json();

  if (!data) {
    return null;
  }

  return {
    title: data.attributes.title,
    subtitle: data.attributes.subtitle,
    profilePicture: data.attributes.profilePicture?.data,
    blocks: data.attributes.blocks,
  };
}
