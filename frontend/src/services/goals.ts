import { Locale } from "@/i18n";
import { host, token } from "./config";
import { ResponseType } from "./types";

export interface Goal {
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

export async function getGoals(locale: Locale): Promise<Goal[]> {
  const response = await fetch(
    `${host}/api/goals?locale=${locale}&fields[0]=name&fields[1]=code&sort=name`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const data: ResponseType<ResponseData> = await response.json();

  return data.data.map((city) => ({
    name: city.attributes.name,
    code: city.attributes.code,
  }));
}
