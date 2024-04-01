"use client";

import { StrapiMediaType } from "@/services/types";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  images: StrapiMediaType[];
  className?: string;
}

export function ImageGallery({ images, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [firstImageVisible, setFirstImageVisible] = useState(true);
  const [lastImageVisible, setLastImageVisible] = useState(false);
  const { ref: firstImageRef } = useInView({
    initialInView: true,
    onChange(inView, entry) {
      if (inView) {
        setFirstImageVisible(true);
      } else {
        setFirstImageVisible(false);
      }
    },
  });

  const justOneImage = images.length === 1;

  const { ref: lastImageRef } = useInView({
    onChange(inView, entry) {
      if (inView) {
        setLastImageVisible(true);
      } else {
        setLastImageVisible(false);
      }
    },
  });

  const scrollLeft = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft - ref.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft + ref.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className={`w-full relative ${className}`}>
      <div
        ref={ref}
        className="flex w-full gap-1 snap-x snap-mandatory overflow-x-auto"
      >
        {images.map((image, index) => (
          <div key={index} className="shrink-0 snap-center w-full scroll-px-8">
            <Image
              ref={
                index === 0
                  ? firstImageRef
                  : index === images.length - 1
                  ? lastImageRef
                  : undefined
              }
              className="object-fit"
              src={image.attributes.url}
              width={image.attributes.width}
              height={image.attributes.height}
              alt={image.attributes.alternativeText ?? "n/a"}
            />
          </div>
        ))}
      </div>
      <div
        className={`${
          justOneImage ? "hidden" : ""
        } absolute top-[50%] -translate-y-[50%] pointer-events-none w-full flex justify-between`}
      >
        <button
          onClick={scrollLeft}
          type="button"
          title="Previous image"
          className={`size-12 md:size-16 opacity-50 pointer-events-auto ${
            firstImageVisible ? "hidden" : "block"
          }`}
        >
          <ArrowLeftCircleIcon className="w-full h-full backdrop-blur-lg" />
        </button>
        <button
          onClick={scrollRight}
          type="button"
          title="Next image"
          className={`size-12 md:size-16 opacity-50 ml-auto pointer-events-auto ${
            lastImageVisible ? "hidden" : "block"
          }`}
        >
          <ArrowRightCircleIcon className="w-full h-full backdrop-blur-lg" />
        </button>
      </div>
    </div>
  );
}
