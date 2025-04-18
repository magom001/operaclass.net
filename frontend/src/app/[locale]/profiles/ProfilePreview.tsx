"use client";

import { Link } from "@/i18n";
import type {} from "@/services/pianists";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

import { ProfilePreviewType } from "@/services/types";
import { useTranslations } from "next-intl";
import qs from "qs";
import { Dispatch, SetStateAction, memo } from "react";
import female_fallback from "./fallback-female.jpeg";
import male_fallback from "./fallback-male.jpeg";

interface Props {
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
  pianist: ProfilePreviewType;
  q?: boolean;
}
export const ProfilePreview = memo(function ProfilePreview({
  setPreviewUrl,
  pianist: {
    slug,
    fullName,
    city,
    country,
    previewVideo,
    sex,
    profileTypes,
    picture,
  },
  q,
}: Props) {
  const t = useTranslations();
  const query = qs.stringify(q ? { q: true } : {}, { addQueryPrefix: true });

  const profilePictureUrl = picture?.url;

  return (
    <div className="w-full p-4 py-6 rounded-lg hover:shadow-md transition-shadow shadow-sm flex flex-col justify-between">
      <div
        style={{
          backgroundImage: `url(${
            profilePictureUrl ??
            (sex === "m" ? male_fallback.src : female_fallback.src)
          })`,
        }}
        className="rounded-lg max-w-full aspect-square bg-center bg-cover"
      >
        {previewVideo ? (
          <div className="w-full h-full flex justify-center items-center backdrop-blur-[2px]">
            <button
              role="button"
              title={t("Profiles.watch-video")}
              className="rounded-lg max-w-full"
              onClick={() => setPreviewUrl(previewVideo.url)}
            >
              <YoutubePlayButton className="h-16 aspect-square" />
            </button>
          </div>
        ) : null}
      </div>
      <Link
        href={`/profiles/${slug}/${query}`}
        className="max-w-full grid grid-cols-[1fr_auto] grid-rows-3 items-center justify-between mt-2"
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
});

function YoutubePlayButton({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipRule="evenodd">
        <path fill="none" d="M0 0h128v128H0z" />
        <path
          d="M126.72 38.224s-1.252-8.883-5.088-12.794c-4.868-5.136-10.324-5.16-12.824-5.458-17.912-1.305-44.78-1.305-44.78-1.305h-.056s-26.868 0-44.78 1.305c-2.504.298-7.956.322-12.828 5.458C2.528 29.342 1.28 38.224 1.28 38.224S0 48.658 0 59.087v9.781c0 10.433 1.28 20.863 1.28 20.863s1.248 8.883 5.084 12.794c4.872 5.136 11.268 4.975 14.116 5.511 10.24.991 43.52 1.297 43.52 1.297s26.896-.04 44.808-1.345c2.5-.302 7.956-.326 12.824-5.462 3.836-3.912 5.088-12.794 5.088-12.794S128 79.302 128 68.868v-9.781c0-10.429-1.28-20.863-1.28-20.863zM50.784 80.72l-.004-36.219 34.584 18.172-34.58 18.047z"
          fill="#CE1312"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}
