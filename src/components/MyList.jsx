import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { BACKGROUND_IMAGE_URL } from "../utils/constants";

const MyList = () => {
  const movies = useSelector((store) => store.myList.movies);

  return (
    <div className="relative min-h-screen text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${BACKGROUND_IMAGE_URL}")` }}
      />

      <div className="absolute inset-0 bg-black/75 sm:bg-black/70" />


      <div className="relative z-10 max-w-6xl mx-auto
        px-4 sm:px-6 md:px-8
        pt-20 sm:pt-22 md:pt-24
        pb-12 sm:pb-14 md:pb-16">

        {/* Heading + count badge */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            My List
          </h2>
          {movies.length > 0 && (
            <span className="bg-red-700 text-white text-xs font-bold
              px-2 py-0.5 rounded-full">
              {movies.length}
            </span>
          )}
        </div>

        {/* Empty State */}
        {movies.length === 0 && (
          <div className="flex flex-col items-center justify-center
            mt-16 sm:mt-20 text-center px-4">
            <p className="text-4xl sm:text-5xl mb-4">🎬</p>
            <p className="text-gray-300 text-base sm:text-lg font-medium">
              Your list is empty
            </p>
            <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-xs">
              Browse the home page and add movies you want to watch later.
            </p>
          </div>
        )}

        {movies.length > 0 && (
          <div className="grid
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
            gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;