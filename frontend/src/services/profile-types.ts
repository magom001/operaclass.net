import qs from "qs";
import { Locale } from "@/i18n";
import { host, token } from "./config";
import { CodeNameResponseType, CodeNameType, ResponseType } from "./types";

export async function getProfileTypes(locale: Locale): Promise<CodeNameType[]> {
  const query = qs.stringify({
    locale,
    fields: ["name", "code"],
    sort: "name",
  });

  const response = await fetch(`${host}/api/profile-types?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const { data }: ResponseType<CodeNameResponseType> = await response.json();

  return data.map((x) => ({
    name: x.attributes.name,
    code: x.attributes.code,
  }));
}
