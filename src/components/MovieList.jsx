import { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);

  if (!movies?.length) return null;

  //Scroll amount reduced on mobile for a more natural swipe feel
  const scroll = (dir) => {
    const amount = window.innerWidth < 640 ? 300 : window.innerWidth < 1024 ? 450 : 600;
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault()
    }
    if (e.key === "ArrowLeft") scroll("left")
    if (e.key === "ArrowRight") scroll("right")
  };

  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4">

      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white px-1">
        {title}
      </h2>

      <div
        className="relative group"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="pointer-events-none absolute left-0 top-0 h-full
          w-6 sm:w-12 md:w-24
          bg-gradient-to-r from-[#141414] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full
          w-6 sm:w-12 md:w-24
          bg-gradient-to-l from-[#141414] to-transparent z-20" />

        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-0 top-0 z-30
            hidden md:group-hover:flex
            h-full w-10 md:w-16
            items-center justify-center
            bg-black/30 hover:bg-black/50
            text-3xl md:text-4xl text-white
            transition"
        >
          ‹
        </button>

        <div
          ref={sliderRef}
          className="flex
            gap-2 sm:gap-3 md:gap-4
            overflow-x-scroll overflow-y-hidden
            scrollbar-hide scroll-smooth
            py-3 sm:py-4 md:py-6
            touch-pan-x
            focus:outline-none"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-0 top-0 z-30
            hidden md:group-hover:flex
            h-full w-10 md:w-16
            items-center justify-center
            bg-black/30 hover:bg-black/50
            text-3xl md:text-4xl text-white
            transition"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default MovieList;