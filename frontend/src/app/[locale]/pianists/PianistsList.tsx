"use client";

import { type PianistPreview as PianistPreviewType } from "@/services/pianists";
import { PianistPreview } from "./PianistPreview";
import { MetaData } from "@/services/config";
import { useEffect, useState } from "react";
import { getPianistsPreview } from "@/app/actions";
import { Spinner } from "@/components/Spinner";
import { useInView } from "react-intersection-observer";
import { useFilters } from "./hooks";

interface Props {
  pianists: PianistPreviewType[];
  pagination: MetaData;
}
export function PianistsList({ pianists, pagination }: Props) {
  const { cities, reads, speaks, experiences } = useFilters();
  const [data, setData] = useState<PianistPreviewType[]>(pianists);
  const [meta, setMeta] = useState(pagination);

  useEffect(() => {
    setData(pianists);
  }, [pianists]);

  const loadMore = async function () {
    const result = await getPianistsPreview(
      "en",
      { city: cities, reads, speaks, experience: experiences },
      { page: meta.pagination.page + 1 }
    );

    setData(data.concat(result.data));
    setMeta(result.meta);
  };

  const { ref } = useInView({
    rootMargin: "200px 0px",
    onChange(inView) {
      if (inView) {
        console.log("loading more data...");
        loadMore();
      }
    },
  });

  return (
    <div>
      <ul className="p-2 grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 md:landscape:grid-cols-3 lg:grid-cols-3 lg:landscape:grid-cols-3 xl:grid-cols-4 xl:landscape:grid-cols-4 gap-1">
        {data.map((p) => (
          <li key={p.id}>
            <PianistPreview pianist={p} />
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
