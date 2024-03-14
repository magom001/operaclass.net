import { Locale } from "@/i18n";
import { Response, host, token } from "./config";

export interface City {
  name: string;
  code: string;
}

interface ResponseData {
  id: number;
  attributes: {
    name: string;
    code: string;
  };
}

export async function getCities(locale: Locale): Promise<City[]> {
  const response = await fetch(
    `${host}/api/cities?locale=${locale}&sort=name`,
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
    code: city.attributes.code,
  }));
}
