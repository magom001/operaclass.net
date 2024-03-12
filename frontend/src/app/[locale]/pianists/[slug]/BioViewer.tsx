"use client";

import { BlockRenderer } from "@/components/BlockRenderer";
import { Block } from "@/services/types";
import { useTranslations } from "next-intl";
import {
  HtmlHTMLAttributes,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

export function BioViewer({
  bio,
  className = "",
}: {
  bio: Block[];
  className?: HtmlHTMLAttributes<HTMLDivElement>["className"];
}) {
  const [isExpanded, setIsExpanded] = useReducer((state) => !state, false);
  const [isClamped, setIsClamped] = useState(false);
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setIsClamped(ref.current.scrollHeight > ref.current.clientHeight);
    }
  }, []);

  return (
    <section className={className}>
      <div
        ref={ref}
        className={isExpanded ? "line-clamp-none" : "line-clamp-6"}
      >
        <BlockRenderer blocks={bio} />
      </div>

      {isClamped && !isExpanded ? (
        <button
          className="text-blue-600 text-sm"
          role="button"
          onClick={setIsExpanded}
          title={t("Common.expand")}
        >
          {t("Common.expand")}...
        </button>
      ) : null}
    </section>
  );
}
