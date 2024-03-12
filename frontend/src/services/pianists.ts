import type { Locale } from "@/i18n";
import qs from "qs";
import { host, token, Response, MetaData } from "./config";
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
  goal?: string | string[];
}

export interface Pagination {
  page?: number;
}

export async function getPianistsPreview(
  locale: Locale,
  searchParams: SearchParams,
  pagination: Pagination = {}
): Promise<{ data: PianistPreview[]; meta: MetaData }> {
  const {
    city,
    speaks = [],
    reads = [],
    experience = [],
    goal = [],
  } = searchParams;
  const { page = 1 } = pagination;

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

  const goalFilter = (Array.isArray(goal) ? goal : [goal]).map((code) => ({
    goals: {
      code: {
        $eq: code,
      },
    },
  }));

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
      pagination: {
        page,
      },
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
          ...goalFilter,
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

  const result: Response<ResponseData> = await response.json();
  const { meta, data } = result;

  const transformed = data.map((p) => {
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

  return { data: transformed, meta };
}
