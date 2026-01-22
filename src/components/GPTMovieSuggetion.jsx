import { useSelector } from "react-redux";

const GPTMovieSuggetion = () => {
  const { movies, isLoading } = useSelector((store) => store.gptMovies);

  const showSkeleton = isLoading || movies.length === 0;

  return (
    <div className="mt-10 max-w-6xl mx-auto text-white">
      <h2 className="text-xl font-semibold mb-4">
        Movie Suggestions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {showSkeleton &&
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 rounded-xl bg-gradient-to-br
                         from-gray-800 to-gray-900
                         animate-pulse"
            />
          ))}

        {!showSkeleton &&
          movies.map((movie) => (
            <div
            key={movie.id}
            className="group relative h-48 rounded-xl
                        bg-gradient-to-br from-[#1e293b] to-[#020617]
                        p-4 overflow-hidden
                        hover:scale-[1.04]
                        transition-all duration-300"
            >
            {/* Title + Meta */}
            <div className="relative z-10">
                <h3 className="text-base font-semibold leading-tight">
                {movie.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                {movie.genre} • {movie.release}
                </p>

                {/* AI confidence badge */}
                {movie.confidence === "high" ? (
                    <span
                    className="inline-block mt-2 px-2 py-[2px]
                                text-[10px] rounded-full
                                bg-emerald-500/20 text-emerald-400"
                    >
                    Highly Recommended
                    </span>
                ) :
                (
                    <span
                    className="inline-block mt-2 px-2 py-[2px]
                                text-[10px] rounded-full
                                bg-yellow-500/20 text-yellow-400"
                    >
                    Recommended
                    </span>
                )}

                {/* AI Tagline (always visible) */}
                <p className="mt-3 text-base text-gray-300 italic">
                “{movie.ai_tagline}”
                </p>
            </div>

            {/* Hover Overlay – Full AI Reason */}
            <div
                className="absolute inset-0 bg-black/85
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        flex items-end p-4"
            >
                <p className="text-sm text-gray-200 leading-snug">
                {movie.ai_reason}
                </p>
            </div>

            {/* Subtle glow */}
            <div
                className="absolute inset-0 rounded-xl
                        bg-gradient-to-tr from-purple-500/10 to-cyan-500/10
                        opacity-0 group-hover:opacity-100
                        transition-opacity"
            />
            </div>
          ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggetion;
