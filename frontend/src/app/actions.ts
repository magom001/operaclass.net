"use server";
import { Locale } from "@/i18n";
import {
  Pagination,
  SearchParams,
  getPianistsPreview as getPianists,
} from "@/services/pianists";

export async function getPianistsPreview(
  locale: Locale,
  searchParams: SearchParams,
  pagination: Pagination
) {
  return getPianists(locale, searchParams, pagination);
}
