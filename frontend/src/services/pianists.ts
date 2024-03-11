import type { Locale } from "@/i18n";
import qs from "qs";
import { host, token, Response } from "./config";

export interface PianistPreview {
  id: number;
  fullName: string;
  city: string;
  sex: "male" | "female";
  previewVideo?: {
    url: string;
  };
}

interface ResponseData {
  id: number;
  attributes: {
    fullName: string;
    sex: "male" | "female";
    city: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    previewVideo?: {
      url: string;
    };
  };
}

export interface SearchParams {
  city: string[];
}

export async function getPianistsPreview(
  locale: Locale,
  searchParams: SearchParams
): Promise<PianistPreview[]> {
  const { city } = searchParams;

  const query = qs.stringify(
    {
      locale,
      sort: ["rating:desc"],
      filters: {
        city: {
          code: {
            $in: city,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await fetch(`${host}/api/pianists?${query}&populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data: Response<ResponseData> = await response.json();

  return data.data.map((p) => {
    const preview = p.attributes.previewVideo?.url;
    return {
      id: p.id,
      fullName: p.attributes.fullName,
      city: p.attributes.city.data.attributes.name,
      sex: p.attributes.sex,
      previewVideo: preview
        ? {
            url: preview,
          }
        : undefined,
    } satisfies PianistPreview;
  });
}
