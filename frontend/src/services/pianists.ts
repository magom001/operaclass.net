import type { Locale } from "@/i18n";

const host = "http://127.0.0.1:1337";
const token =
  process.env.API_TOKEN ??
  "1cb3290d82554709a7d74c77e931fd08df5eee94d9bed53c61bc2f9806129ebfd3304e1af01eeae039e897ce88c28a532581010427e79be6e667c5edb57fee04257910d86f4429490d979024de7f00c8640c8bbb57c70005205e9403e64d9969b409ccd1a7f5a27d2a747848495d48a02ef024a28e4af538c7b6bb3a009de5fc";

interface MetaData {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface PianistPreview {
  id: number;
  fullName: string;
  city: string;
  previewVideo?: {
    url: string;
  };
}

interface ResponseData {
  id: number;
  attributes: {
    fullName: string;
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

interface Response {
  data: ResponseData[];
  meta: MetaData;
}

export async function getPianistsPreview(
  locale: Locale
): Promise<PianistPreview[]> {
  const response = await fetch(
    `${host}/api/pianists?locale=${locale}&fields[0]=fullName&populate[0]=city&populate[1]=previewVideo`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: Response = await response.json();

  return data.data.map((p) => {
    const preview = p.attributes.previewVideo?.url;

    return {
      id: p.id,
      fullName: p.attributes.fullName,
      city: p.attributes.city.data.attributes.name,
      previewVideo: preview
        ? {
            url: preview,
          }
        : undefined,
    } satisfies PianistPreview;
  });
}
