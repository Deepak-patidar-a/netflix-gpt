import React from "react";

const VideoTitle = ({ movie }) => {
  const title = movie.primaryTitle?.titleText?.text;
  const description = movie.description?.value;
  const rating = movie.primaryTitle?.ratingsSummary?.aggregateRating;
  const year = movie.primaryTitle?.releaseYear?.year;

  return (
    <div className="absolute bottom-24 left-12 z-20 max-w-xl text-white">
      <h1 className="text-5xl font-bold mb-4">{title}</h1>

      <p className="text-sm mb-2 opacity-80">
        ⭐ {rating} • {year}
      </p>

      <p className="text-base mb-6 line-clamp-3">
        {description}
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-300">
          ▶ Play
        </button>
        <button className="bg-gray-700/70 px-6 py-2 rounded font-semibold hover:bg-gray-600">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
