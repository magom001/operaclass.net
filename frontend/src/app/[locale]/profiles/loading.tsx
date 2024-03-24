import { Spinner } from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
      <Spinner />
    </div>
  );
}
