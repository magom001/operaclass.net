import { Locale } from "@/i18n";
import { Response, host, token } from "./config";

export interface Language {
  name: string;
  alpha2: string;
}

interface ResponseData {
  id: number;
  attributes: {
    name: string;
    alpha2: string;
  };
}

export async function getLanguages(locale: Locale): Promise<Language[]> {
  const response = await fetch(
    `${host}/api/languages?locale=${locale}&fields[0]=name&fields[1]=alpha2&sort=name`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const data: Response<ResponseData> = await response.json();

  return data.data.map((city) => ({
    name: city.attributes.name,
    alpha2: city.attributes.alpha2,
  }));
}
