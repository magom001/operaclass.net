"use client";

import { getPianistsPreview } from "@/app/actions";
import { Spinner } from "@/components/Spinner";
import { Locale } from "@/i18n";
import { SearchParams } from "@/services/pianists";
import { MetaData, ProfilePreviewType } from "@/services/types";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ProfilePreview } from "./ProfilePreview";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  searchParams: SearchParams;
  pianists: ProfilePreviewType[];
  pagination: MetaData;
  locale: Locale;
}

type PreviewUrl = string;

export function ProfilesList({
  pianists,
  pagination,
  locale,
  searchParams,
}: Props) {
  const [data, setData] = useState<ProfilePreviewType[]>(pianists);
  const [meta, setMeta] = useState(pagination);
  const [previewUrl, setPreviewUrl] = useState<PreviewUrl | null>(null);

  useEffect(() => {
    setData(pianists);
    setMeta(pagination);
  }, [pianists, pagination]);

  const loadMore = async function () {
    const result = await getPianistsPreview(locale, searchParams, {
      page: meta.pagination.page + 1,
    });
    setData(data.concat(result.data));
    setMeta(result.meta);
  };

  const { ref } = useInView({
    rootMargin: "200px 0px",
    onChange(inView) {
      if (inView) {
        console.info("loading more data...");
        loadMore();
      }
    },
  });

  return (
    <div className="relative">
      <PreviewWindow
        previewUrl={previewUrl}
        onClose={() => setPreviewUrl(null)}
      />
      <ul className="p-2 grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 md:landscape:grid-cols-3 lg:grid-cols-3 lg:landscape:grid-cols-3 xl:grid-cols-4 xl:landscape:grid-cols-4 gap-1">
        {data.map((p) => (
          <li key={p.id}>
            <ProfilePreview pianist={p} q setPreviewUrl={setPreviewUrl} />
          </li>
        ))}
        {meta.pagination.page < meta.pagination.pageCount && (
          <li ref={ref} className="flex justify-center">
            <Spinner />
          </li>
        )}
      </ul>
    </div>
  );
}

interface PreviewWindowProps {
  previewUrl: PreviewUrl | null;
  onClose: () => void;
}

function PreviewWindow({ previewUrl, onClose }: PreviewWindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewUrl) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [previewUrl]);

  return (
    <div
      onClick={onClose}
      ref={container}
      className={`fixed flex items-center justify-center ${
        previewUrl
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } bg-gray-600 bg-opacity-50 h-dvh max-h-[calc(100dvh-var(--header-height))] w-full z-9999 p-2 md:p-4 lg:p-24 transition-all`}
    >
      <button
        className="absolute right-3 top-3 z-9999 rounded-full border-2 border-black"
        onClick={onClose}
        title="Close"
        role="button"
      >
        <XMarkIcon className="h-8 w-8" />
      </button>
      <div ref={ref} className="w-full aspect-16/9 max-h-full">
        {previewUrl && (
          <iframe
            title="Pianist preview video"
            className="rounded-lg w-full h-full"
            src={`${previewUrl}?controls=1`}
          />
        )}
      </div>
    </div>
  );
}
