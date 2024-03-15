import type { Locale } from "@/i18n";
import qs from "qs";
import { host, token, Response, MetaData } from "./config";
import { Block } from "./types";

export interface PianistPreview {
  id: number;
  fullName: string;
  city?: string;
  sex?: "male" | "female";
  previewVideo?: {
    url: string;
  };
}

interface PianistsPreviewResponseData {
  id: number;
  attributes: {
    fullName: string;
    sex: "male" | "female";
    city?: {
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
      fields: ["fullName", "sex"],
      populate: {
        city: {
          fields: ["name", "code"],
        },
        previewVideo: {
          fields: ["url"],
        },
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

  const response = await fetch(`${host}/api/pianists?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const result: Response<PianistsPreviewResponseData> = await response.json();

  const { meta, data } = result;

  const transformed = data.map((p) => {
    const preview = p.attributes.previewVideo?.url;

    return {
      id: p.id,
      fullName: p.attributes.fullName,
      city: p.attributes.city?.data.attributes.name,
      sex: p.attributes.sex,
      previewVideo: preview
        ? {
            url: preview,
          }
        : undefined,
    } satisfies PianistPreview;
  });

  return { data: transformed, meta };
}

interface PianistResponseData {
  id: number;
  attributes: {
    fullName: string;
    sex: "male" | "female";
    previewVideo: null | { url: string };
    bio: Block[];
    city: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
    reads: {
      data: {
        attributes: {
          name: string;
        };
      }[];
    };
    speaks: {
      data: {
        attributes: {
          name: string;
        };
      }[];
    };
    goals: {
      data: {
        attributes: {
          name: string;
        };
      }[];
    };
    experiences: {
      data: {
        attributes: {
          name: string;
        };
      }[];
    };
    recommendations: {
      name: string;
      profileLink: string;
    }[];
    contacts: {
      type: ContactInfo["type"];
      data: string;
    }[];
  };
}

export interface ContactInfo {
  type:
    | "email"
    | "phone"
    | "whatsapp"
    | "telegram"
    | "facebook"
    | "instagram"
    | "linkedin"
    | "url"
    | "vk";
  data: string;
}

interface Recommendation {
  name: string;
  profileLink: string;
}

interface Pianist {
  fullName: string;
  city?: string;
  bio?: Block[];
  reads?: string[];
  speaks?: string[];
  goals?: string[];
  experiences?: string[];
  recommendations?: Recommendation[];
  previewVideo: null | {
    url: string;
  };
  contacts?: ContactInfo[];
}

export async function getPianistById(
  locale: Locale,
  id: string
): Promise<Pianist> {
  const query = qs.stringify({
    fields: ["fullName", "sex", "bio"],
    locale,
    populate: {
      previewVideo: {
        fields: ["url"],
      },
      contacts: {
        fields: ["type", "data"],
      },
      city: {
        fields: ["name"],
      },
      reads: {
        fields: ["name"],
      },
      speaks: {
        fields: ["name"],
      },
      goals: {
        fields: ["name"],
      },
      experiences: {
        fields: ["name"],
      },
      recommendations: {
        fields: ["name", "profileLink"],
      },
    },
  });

  const response = await fetch(`${host}/api/pianists/${id}?${query}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  const { data }: { data: PianistResponseData } = await response.json();

  return {
    fullName: data.attributes.fullName,
    city: data.attributes.city.data.attributes.name,
    bio: data.attributes.bio,
    reads: data.attributes.reads.data.map((l) => l.attributes.name),
    speaks: data.attributes.speaks.data.map((l) => l.attributes.name),
    goals: data.attributes.goals.data.map((l) => l.attributes.name),
    experiences: data.attributes.experiences.data.map((l) => l.attributes.name),
    previewVideo: data.attributes.previewVideo,
    recommendations: data.attributes.recommendations,
    contacts: data.attributes.contacts?.map((c) => ({
      type: c.type,
      data: c.data,
    })),
  };
}
