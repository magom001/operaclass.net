"use client";

import { getPianistsPreview } from "@/app/actions";
import { Spinner } from "@/components/Spinner";
import { Locale } from "@/i18n";
import { SearchParams } from "@/services/pianists";
import { MetaData, ProfilePreviewType } from "@/services/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ProfilePreview } from "./ProfilePreview";

interface Props {
  searchParams: SearchParams;
  pianists: ProfilePreviewType[];
  pagination: MetaData;
  locale: Locale;
}
export function ProfilesList({
  pianists,
  pagination,
  locale,
  searchParams,
}: Props) {
  const [data, setData] = useState<ProfilePreviewType[]>(pianists);
  const [meta, setMeta] = useState(pagination);

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
    <div>
      <ul className="p-2 grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 md:landscape:grid-cols-3 lg:grid-cols-3 lg:landscape:grid-cols-3 xl:grid-cols-4 xl:landscape:grid-cols-4 gap-1">
        {data.map((p) => (
          <li key={p.id}>
            <ProfilePreview pianist={p} q />
          </li>
        ))}
      </ul>
      {meta.pagination.page < meta.pagination.pageCount && (
        <li ref={ref} className="flex justify-center">
          <Spinner />
        </li>
      )}
    </div>
  );
}
