import React from "react";

const VideoTitle = ({ movie }) => {
  const title = movie?.title;
  const description = movie?.description;
  const rating = movie?.rating;
  const year = movie?.year;

  return (
    <div className="absolute z-20 text-white
      bottom-16 left-4 right-4
      sm:bottom-20 sm:left-8 sm:right-auto
      md:bottom-24 md:left-12
      max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl">

      <h1 className="font-bold mb-2 sm:mb-3 md:mb-4
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl
        leading-tight drop-shadow-lg">
        {title}
      </h1>

      <p className="hidden xs:block sm:block text-xs sm:text-sm mb-2 opacity-80">
        ⭐ {rating} • {year}
      </p>

      <p className="hidden sm:block text-sm md:text-base mb-4 md:mb-6
        line-clamp-2 md:line-clamp-3 opacity-90 leading-relaxed">
        {description}
      </p>

      <div className="flex gap-2 sm:gap-3 md:gap-4">
        <button className="bg-white text-black
          px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2
          text-sm sm:text-base
          rounded font-semibold
          hover:bg-gray-300 active:bg-gray-400
          transition shadow-md">
          ▶ Play
        </button>

        <button className="bg-gray-700/70 text-white
          px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2
          text-sm sm:text-base
          rounded font-semibold
          hover:bg-gray-600 active:bg-gray-500
          transition shadow-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;