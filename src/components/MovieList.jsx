import { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);

  if (!movies?.length) return null;

  const scroll = (dir) => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -600 : 600,
      behavior: "smooth",
    });
  };
 
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault(); // 🚨 CRITICAL
    }

    if (e.key === "ArrowLeft") scroll("left");
    if (e.key === "ArrowRight") scroll("right");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold text-white">
        {title}
      </h2>

      <div
        className="relative group"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* LEFT EDGE FADE */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#141414] to-transparent z-20" />

        {/* RIGHT EDGE FADE */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#141414] to-transparent z-20" />

        {/* LEFT ARROW */}
        <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 z-30 hidden group-hover:flex h-full w-16 items-center justify-center bg-black/30 hover:bg-black/50 text-4xl text-white"
        >
            ‹
        </button>

        {/* SCROLL CONTAINER */}
        <div
            ref={sliderRef}
            className="
                flex gap-4
                overflow-x-scroll overflow-y-hidden
                scrollbar-hide
                scroll-smooth
                py-6
                focus:outline-none"
            >
            {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>

        {/* RIGHT ARROW */}
        <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 z-30 hidden group-hover:flex h-full w-16 items-center justify-center bg-black/30 hover:bg-black/50 text-4xl text-white"
        >
            ›
        </button>
      </div>
    </div>
  );
};

export default MovieList;
