"use client";

import { BlockRenderer } from "@/components/BlockRenderer";
import { Block } from "@/services/types";
import { useTranslations } from "next-intl";
import { HtmlHTMLAttributes, useRef } from "react";

export function BioViewer({
  bio,
  className = "",
}: {
  bio: Block[];
  className?: HtmlHTMLAttributes<HTMLDivElement>["className"];
}) {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className={className}>
      <BlockRenderer blocks={bio} />
    </section>
  );
}
