import type { PianistPreview } from "@/services/pianists";

interface Props {
  pianist: PianistPreview;
}
export function PianistPreview({
  pianist: { id, fullName, city, previewVideo },
}: Props) {
  return (
    <div className="w-full aspect-square">
      <iframe
        className="rounded-lg"
        width="100%"
        height="100%"
        src={`${previewVideo?.url}?controls=0`}
      ></iframe>
      <div className="py-2">
        <h3 className="text-xl font-bold">{fullName}</h3>
        <span className="font-thin">{city}</span>
      </div>
    </div>
  );
}
