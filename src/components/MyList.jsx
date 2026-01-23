import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { BACKGROUND_IMAGE_URL } from "../utils/constants";

const MyList = () => {
  const movies = useSelector((store) => store.myList.movies);

  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url("${BACKGROUND_IMAGE_URL}")`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          My List
        </h2>

        {/* Empty State */}
        {movies.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-gray-400 text-lg">
              Your list is empty
            </p>
            <p className="text-gray-500 mt-2 text-base">
              Add movies from the home page to see them here.
            </p>
          </div>
        )}

        {/* Movie Grid */}
        {movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showActions={true} // we’ll reuse this later
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
