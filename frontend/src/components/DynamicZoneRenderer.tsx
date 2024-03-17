import { Block } from "@/services/types";
import { BlockRenderer } from "./BlockRenderer";

interface StrapiMediaFormatType {
  ext: string;
  url: string;
  mime: string;
  width: number;
  height: number;
}

export interface StrapiMediaType {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    url: string;
    previewUrl?: string;
    formats: {
      large?: StrapiMediaFormatType;
      medium?: StrapiMediaFormatType;
      small?: StrapiMediaFormatType;
      thumbnail?: StrapiMediaFormatType;
    };
  };
}

interface GenericGallery {
  __component: "generic.gallery";
  images: {
    data?: StrapiMediaType[];
  };
}

interface GenericVideoGallery {
  __component: "generic.video-gallery";
  videos: {
    url: string;
  }[];
}

interface GenericBio {
  __component: "generic.bio";
  content?: Block[];
}

export type DynamicZoneBlock =
  | GenericGallery
  | GenericVideoGallery
  | GenericBio;

export function DynamicZoneRenderer({
  blocks = [],
}: {
  blocks: DynamicZoneBlock[];
}) {
  return blocks.map((block, index) => {
    switch (block.__component) {
      case "generic.gallery":
        return (
          <ul key={index}>
            {block.images?.data?.map((image, index) => (
              <li key={index}>
                <img
                  src={image.attributes.url}
                  alt={image.attributes.alternativeText ?? "n/a"}
                />
              </li>
            ))}
          </ul>
        );
      case "generic.video-gallery":
        return (
          <ul key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {block.videos?.map((video, index) => (
              <li key={index}>
                <iframe
                  title="Pianist preview video"
                  className="rounded-lg w-full max-w-full aspect-[16/9]"
                  src={`${video.url}?controls=1`}
                />
              </li>
            ))}
          </ul>
        );
      case "generic.bio":
        return block.content ? (
          <div>
            <BlockRenderer key={index} blocks={block.content} />
          </div>
        ) : null;
      default:
        return null;
    }
  });
}
