import { Spinner } from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="p-3">
      <div
        role="status"
        className="flex items-center justify-center h-56 max-w-sm rounded-lg animate-pulse bg-gray-900 mb-2"
      >
        <svg
          className="w-10 h-10 text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-8 rounded-full bg-gray-900 w-48 mb-2"></div>
        <div className="h-4 rounded-full bg-gray-900 w-24 mb-4"></div>

        <div className="flex flex-row items-center justify-center mb-2">
          <div className="rounded-full bg-gray-900 w-16 h-16 mx-2" />
          <div className="rounded-full bg-gray-900 w-16 h-16 mx-2" />
          <div className="rounded-full bg-gray-900 w-16 h-16 mx-2" />
        </div>

        <div className="h-4 rounded-full bg-gray-900 w-16 mb-1"></div>
        <div className="h-24 rounded-xl bg-gray-900 mb-3"></div>

        <div className="h-4 rounded-full bg-gray-900 w-16 mb-1"></div>
        <div className="h-24 rounded-xl bg-gray-900 mb-3"></div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
