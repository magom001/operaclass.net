"use client";

import { ShareIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";

interface Props {
  title: string;
  text?: string;
}

export function ShareButton({ title, text }: Props) {
  const [canShare, setCanShare] = useState(true);
  const onClick = useCallback(async () => {
    try {
      await navigator.share({
        title,
        text,
        url: window.location.href,
      });
    } catch (e) {
      // ignore
    }
  }, [title, text]);

  useEffect(() => {
    setCanShare(
      navigator?.canShare?.({
        title,
        text,
        url: window.location.href,
      })
    );
  }, [title, text]);

  if (!canShare) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      type="button"
      title="share"
      className="flex items-center shadow-sm hover:shadow-lg hover:scale-[1.05] active:scale-[0.98] transition-all justify-center w-8 h-8 border-2 text-current border-current rounded-full"
    >
      <ShareIcon className="w-[70%] h-[70%] -translate-x-[1px]" />
    </button>
  );
}
