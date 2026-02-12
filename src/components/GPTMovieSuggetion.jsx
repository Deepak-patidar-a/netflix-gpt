import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

const GPTMovieSuggetion = () => {
  const movies = useSelector((store) => store.gptMovies.movies, shallowEqual)
  const isLoading = useSelector((store) => store.gptMovies.isLoading)

  const [activeMobile, setActiveMobile] = useState(null)

  const showSkeleton = isLoading || movies.length === 0

  const handleCardTap = (id) => {
    setActiveMobile((prev) => (prev === id ? null : id))
  };

  return (
    <div className="mt-6 sm:mt-8 md:mt-10 w-full max-w-6xl mx-auto text-white">

      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">
        🎥 Movie Suggestions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">

        {showSkeleton &&
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 sm:h-44 md:h-48 rounded-xl
                bg-gradient-to-br from-gray-800 to-gray-900
                animate-pulse"
            />
          ))}

        {!showSkeleton &&
          movies.map((movie) => {
            const isMobileActive = activeMobile === movie.id;

            return (
              <div
                key={movie.id}
                onClick={() => handleCardTap(movie.id)}
                className="group relative
                  h-40 sm:h-44 md:h-48
                  rounded-xl cursor-pointer
                  bg-gradient-to-br from-[#1e293b] to-[#020617]
                  p-3 sm:p-4 overflow-hidden
                  hover:scale-[1.04] active:scale-[1.02]
                  transition-all duration-300
                  select-none"
              >
                <div className="relative z-10">

                  <h3 className="text-sm sm:text-base font-semibold leading-tight line-clamp-2">
                    {movie.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {movie.genre} • {movie.release}
                  </p>

                  {movie.confidence === "high" ? (
                    <span className="inline-block mt-1.5 sm:mt-2 px-2 py-[2px]
                      text-[9px] sm:text-[10px] rounded-full
                      bg-emerald-500/20 text-emerald-400">
                      Highly Recommended
                    </span>
                  ) : (
                    <span className="inline-block mt-1.5 sm:mt-2 px-2 py-[2px]
                      text-[9px] sm:text-[10px] rounded-full
                      bg-yellow-500/20 text-yellow-400">
                      Recommended
                    </span>
                  )}

                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-300 italic line-clamp-2">
                    "{movie.ai_tagline}"
                  </p>
                </div>

                <div
                  className={`absolute inset-0 bg-black/85
                    transition-opacity duration-300
                    flex items-end p-3 sm:p-4 rounded-xl
                    ${isMobileActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                    }`}
                >
                  <div className="w-full">
                    <p className="text-xs sm:text-sm text-gray-200 leading-snug mb-2">
                      {movie.ai_reason}
                    </p>
                    <p className="text-[10px] text-gray-500 md:hidden">
                      Tap to close
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl
                  bg-gradient-to-tr from-purple-500/10 to-cyan-500/10
                  opacity-0 group-hover:opacity-100
                  transition-opacity" />
              </div>
            );
          })}
      </div>

      {!isLoading && movies.length === 0 && (
        <p className="text-center text-gray-500 text-sm mt-8">
          No suggestions yet. Try searching for a mood, genre, or movie title!
        </p>
      )}
    </div>
  );
};

export default GPTMovieSuggetion;