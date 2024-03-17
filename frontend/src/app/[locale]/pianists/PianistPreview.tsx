"use client";

import { Link } from "@/i18n";
import type { PianistPreview } from "@/services/pianists";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

import female_fallback from "./fallback-female.jpeg";
import male_fallback from "./fallback-male.jpeg";

interface Props {
  pianist: PianistPreview;
}
export function PianistPreview({
  pianist: { slug, fullName, city, previewVideo, sex },
}: Props) {
  return (
    <div className="w-full p-4 py-6 rounded-lg shadow flex flex-col justify-between">
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
              sex === "male" ? male_fallback.src : female_fallback.src
            })`,
          }}
          className="rounded-lg max-w-full aspect-[16/9] bg-center bg-cover"
        />
      )}
      <Link
        href={`${slug}/`}
        className="grid grid-cols-[1fr_auto] grid-rows-1 pt-2 text-gray-950 items-center"
      >
        <div className="flex flex-col">
          <h3 className="text-sm text-nowrap font-bold overflow-hidden text-ellipsis">
            {fullName}
          </h3>
          <span className="text-xs font-thin">{city}</span>
        </div>
        <ChevronRightIcon className="h-6 aspect-square" />
      </Link>
    </div>
  );
}