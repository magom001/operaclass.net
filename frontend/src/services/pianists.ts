import type { Locale } from "@/i18n";
import qs from "qs";
import { host, token } from "./config";
import {
  Block,
  ResponseType,
  ProfileType,
  ContactInfoType,
  ProfilePreview,
  ProfileTypeType,
  StrapiMediaType,
} from "./types";

export interface SearchParams {
  profileType?: string;
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
) {
  const {
    city,
    speaks = [],
    reads = [],
    experience = [],
    goal = [],
    profileType,
  } = searchParams;
  const { page = 1 } = pagination;

  const profileTypeFilter =
    (Array.isArray(profileType) ? profileType.at(0) : profileType) || undefined;

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
          populate: ["country"],
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
            $eq: profileTypeFilter,
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

  const result: ResponseType<ProfileType> = await response.json();

  const { meta, data } = result;

  const transformed = data.map((p) => {
    const preview = p.attributes.videos?.length
      ? p.attributes.videos[0]
      : undefined;

    return {
      id: p.id,
      fullName: `${p.attributes.firstName} ${p.attributes.lastName}`,
      slug: p.attributes.slug,
      city: p.attributes.city?.data?.attributes.name,
      country:
        p.attributes.city?.data?.attributes.country?.data?.attributes.name,
      sex: p.attributes.sex,
      previewVideo: preview,
    } satisfies ProfilePreview;
  });

  return { data: transformed, meta };
}

interface Recommendation {
  name: string;
  profileLink: string;
}

interface Pianist {
  fullName: string;
  city?: string;
  country?: string;
  bio?: Block[];
  reads?: string[];
  speaks?: string[];
  goals?: string[];
  experiences?: string[];
  recommendations?: Recommendation[];
  previewVideo: null | {
    url: string;
  };
  profileTypes?: ProfileTypeType[];
  contacts?: ContactInfoType[];
  pictures: StrapiMediaType["attributes"][];
}

export async function getPianistBySlug(
  locale: Locale,
  slug: string
): Promise<Pianist | null> {
  const query = qs.stringify({
    locale,
  });
  const response = await fetch(`${host}/api/profiles/slug/${slug}?${query}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  const { data }: { data: ProfileType | null } = await response.json();

  if (!data) {
    return null;
  }

  return {
    fullName: data.attributes.firstName + " " + data.attributes.lastName,
    city: data.attributes.city?.data?.attributes.name,
    country:
      data.attributes.city?.data?.attributes.country?.data?.attributes.name,
    bio: data.attributes.bio,
    reads: data.attributes.reads?.data?.map((l) => l.attributes.name),
    speaks: data.attributes.speaks?.data?.map((l) => l.attributes.name),
    goals: data.attributes.goals?.data?.map((l) => l.attributes.name),
    experiences: data.attributes.experiences?.data?.map(
      (l) => l.attributes.name
    ),
    previewVideo: data.attributes.videos?.length
      ? data.attributes.videos[0]
      : null,
    recommendations: data.attributes.recommendations,
    contacts: data.attributes.contacts?.map((c) => ({
      type: c.type,
      data: c.data,
    })),
    profileTypes: data.attributes.profileTypes?.data?.map((pt) => ({
      name: pt.attributes.name,
      code: pt.attributes.code,
    })),
    pictures: data.attributes.pictures?.data?.map((p) => p.attributes) ?? [],
  };
}
