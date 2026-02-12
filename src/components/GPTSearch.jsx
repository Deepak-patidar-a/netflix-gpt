import { BACKGROUND_IMAGE_URL } from "../utils/constants";
import { lazy, Suspense } from "react";

const GPTSearchBar = lazy(() => import("./GPTSearchBar"));
const GPTMovieSuggetion = lazy(() => import("./GPTMovieSuggetion"));

const GPTSearch = () => {
  return (
    <div className="relative min-h-screen w-full">

      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10
        pt-20 sm:pt-24 md:pt-28 lg:pt-32
        px-4 sm:px-6 md:px-10 lg:px-12
        pb-12 sm:pb-16">

        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <p className="text-white text-sm sm:text-base animate-pulse">
                Loading search...
              </p>
            </div>
          }
        >
          <GPTSearchBar />
          <GPTMovieSuggetion />
        </Suspense>
      </div>
    </div>
  );
};

export default GPTSearch;