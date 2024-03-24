"use client";

import { Link } from "@/i18n";
import type {} from "@/services/pianists";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

import { ProfilePreview } from "@/services/types";
import qs from "qs";
import female_fallback from "./fallback-female.jpeg";
import male_fallback from "./fallback-male.jpeg";

interface Props {
  pianist: ProfilePreview;
  q?: boolean;
}
export function PianistPreview({
  pianist: { slug, fullName, city, country, previewVideo, sex },
  q,
}: Props) {
  const query = qs.stringify(q ? { q: true } : {}, { addQueryPrefix: true });
  return (
    <div className="w-full p-4 py-6 rounded-lg hover:shadow-xl transition-shadow shadow flex flex-col justify-between">
      {previewVideo ? (
        <iframe
          title="Pianist preview video"
          className="rounded-lg max-w-full aspect-[16/9]"
          src={`${previewVideo?.url}?controls=1`}
        />
      ) : (
        <div
          style={{
            backgroundImage: `url(${
              sex === "m" ? male_fallback.src : female_fallback.src
            })`,
          }}
          className="rounded-lg max-w-full aspect-[16/9] bg-center bg-cover"
        />
      )}
      <Link
        href={`/profiles/${slug}/${query}`}
        className="grid grid-cols-[1fr_auto] grid-rows-1 pt-2 text-gray-950 items-center"
      >
        <div className="flex flex-col">
          <h3 className="text-sm text-nowrap font-bold overflow-hidden text-ellipsis">
            {fullName}
          </h3>
          <span className="text-xs font-thin">
            {[city, country].filter(Boolean).join(", ")}
          </span>
        </div>
        <ChevronRightIcon className="h-6 aspect-square" />
      </Link>
    </div>
  );
}
