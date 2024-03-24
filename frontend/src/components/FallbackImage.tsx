import female_fallback from "./fallback-female.jpeg";
import male_fallback from "./fallback-male.jpeg";
import Image from "next/image";

export function FallbackImage({
  sex,
  className,
}: {
  sex: "m" | "f";
  className?: string;
}) {
  const image = sex === "m" ? male_fallback : female_fallback;

  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt="fallback"
      className={className}
    />
  );
}
