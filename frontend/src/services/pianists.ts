import type { Locale } from "@/i18n";
import qs from "qs";
import { host, token } from "./config";
import { Block, Response, ProfileType, MetaData, VideoLinkType } from "./types";

export interface PianistPreview {
  id: number;
  fullName: string;
  slug: string;
  city?: string;
  sex?: "male" | "female";
  previewVideo?: VideoLinkType;
}

interface PianistsPreviewResponseData {
  id: number;
  attributes: {
    fullName: string;
    slug: string;
    sex: "male" | "female";
    city?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    previewVideo?: VideoLinkType;
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

export async function getPianistsPreviewV2(
  locale: Locale,
  searchParams: SearchParams,
  pagination: Pagination = {}
) {
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
      fields: ["firstName", "lastName", "sex", "slug"],
      populate: {
        city: {
          fields: ["name", "code"],
        },
        videos: {
          fields: ["url"],
        },
      },
      locale,
      sort: ["rating:desc"],
      filters: {
        profileTypes: {
          code: {
            $eq: "pianist",
          },
        },
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

  const response = await fetch(`${host}/api/profiles?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const result: Response<ProfileType> = await response.json();

  const { meta, data } = result;

  const transformed = data.map((p) => {
    const preview = p.attributes.videos?.length
      ? p.attributes.videos[0]
      : undefined;

    return {
      id: p.id,
      fullName: `${p.attributes.firstName} ${p.attributes.lastName}`,
      slug: p.attributes.slug,
      city: p.attributes.city?.data.attributes.name,
      sex: p.attributes.sex === "m" ? "male" : "female",
      previewVideo: preview,
    } satisfies PianistPreview;
  });

  return { data: transformed, meta };
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
      fields: ["fullName", "sex", "slug"],
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
    const preview = p.attributes.previewVideo;

    return {
      id: p.id,
      fullName: p.attributes.fullName,
      slug: p.attributes.slug,
      city: p.attributes.city?.data.attributes.name,
      sex: p.attributes.sex,
      previewVideo: preview,
    } satisfies PianistPreview;
  });

  return { data: transformed, meta };
}

interface PianistResponseData {
  id: number;
  attributes: {
    fullName: string;
    sex: "male" | "female";
    slug: string;
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
): Promise<Pianist | null> {
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

  const { data }: { data: PianistResponseData | null } = await response.json();

  if (!data) {
    return null;
  }

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

export async function getPianistBySlug(
  locale: Locale,
  slug: string
): Promise<Pianist | null> {
  const query = qs.stringify({
    locale,
  });
  const response = await fetch(`${host}/api/pianists/slug/${slug}?${query}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  const { data }: { data: PianistResponseData | null } = await response.json();

  if (!data) {
    return null;
  }

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
