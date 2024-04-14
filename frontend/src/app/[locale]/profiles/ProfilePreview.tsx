"use client";

import { Link } from "@/i18n";
import type {} from "@/services/pianists";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

import { ProfilePreviewType } from "@/services/types";
import qs from "qs";
import female_fallback from "./fallback-female.jpeg";
import male_fallback from "./fallback-male.jpeg";

interface Props {
  pianist: ProfilePreviewType;
  q?: boolean;
}
export function ProfilePreview({
  pianist: { slug, fullName, city, country, previewVideo, sex, profileTypes },
  q,
}: Props) {
  const query = qs.stringify(q ? { q: true } : {}, { addQueryPrefix: true });
  return (
    <div className="w-full p-4 py-6 rounded-lg hover:shadow-md transition-shadow shadow flex flex-col justify-between">
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
        className="max-w-full grid grid-cols-[1fr,auto] grid-rows-3 items-center justify-between mt-2"
      >
        <h3 className="text-sm text-nowrap font-bold overflow-hidden text-ellipsis">
          {fullName}
        </h3>
        <ChevronRightIcon className="h-6 aspect-square row-span-3" />
        <p className="text-xs first-letter:capitalize max-w-full overflow-hidden text-ellipsis whitespace-nowrap mb-1">
          {profileTypes.join(", ")}
        </p>
        <span className="text-xs font-thin">
          {[city, country].filter(Boolean).join(", ")}
        </span>
      </Link>
    </div>
  );
}
