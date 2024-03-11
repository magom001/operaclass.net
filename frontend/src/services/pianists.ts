import type { Locale } from "@/i18n";
import qs from "qs";
import { host, token, Response } from "./config";
import { Language } from "./languages";

export interface PianistPreview {
  id: number;
  fullName: string;
  city: string;
  sex: "male" | "female";
  previewVideo?: {
    url: string;
  };
  speaks: Language[];
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
    speaks: {
      data: [
        {
          id: number;
          attributes: {
            name: string;
            alpha2: string;
          };
        }
      ];
    };
    previewVideo?: {
      url: string;
    };
  };
}

export interface SearchParams {
  city?: string | string[];
  speaks?: string | string[];
  reads?: string | string[];
  experience?: string | string[];
}

export async function getPianistsPreview(
  locale: Locale,
  searchParams: SearchParams
): Promise<PianistPreview[]> {
  const { city, speaks = [], reads = [], experience = [] } = searchParams;

  const spokenLanguagesFilter = (Array.isArray(speaks) ? speaks : [speaks]).map(
    (alpha2) => ({
      speaks: {
        alpha2: {
          $eq: alpha2,
        },
      },
    })
  );

  const readLanguagesFilter = (Array.isArray(reads) ? reads : [reads]).map(
    (alpha2) => ({
      reads: {
        alpha2: {
          $eq: alpha2,
        },
      },
    })
  );

  const experiencesFilter = (
    Array.isArray(experience) ? experience : [experience]
  ).map((code) => ({
    experiences: {
      code: {
        $eq: code,
      },
    },
  }));

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
        $and: [
          ...spokenLanguagesFilter,
          ...readLanguagesFilter,
          ...experiencesFilter,
        ],
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

  console.log("data", data);

  return data.data.map((p) => {
    const preview = p.attributes.previewVideo?.url;
    const speaks = p.attributes.speaks.data.map((s) => ({
      name: s.attributes.name,
      alpha2: s.attributes.alpha2,
    }));

    return {
      id: p.id,
      fullName: p.attributes.fullName,
      city: p.attributes.city.data.attributes.name,
      sex: p.attributes.sex,
      speaks,
      previewVideo: preview
        ? {
            url: preview,
          }
        : undefined,
    } satisfies PianistPreview;
  });
}
