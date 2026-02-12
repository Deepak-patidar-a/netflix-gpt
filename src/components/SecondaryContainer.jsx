// src/components/SecondaryContainer.jsx
import React from "react";
import MovieList from "./MovieList";
import { ACTION_MOVIES, DRAMA_MOVIES, HISTORY_MOVIES, NEW_RELEASE_MOVIES } from "../mock/fakeMovies";

const SecondaryContainer = () => {
  return (
    <div className="relative z-20
      bg-gradient-to-b from-[#141414] via-[#101010] to-[#0b0b0b]
      px-3 sm:px-6 md:px-12
      pt-6 sm:pt-8 md:pt-10
      pb-12 sm:pb-16 md:pb-20
      space-y-10 sm:space-y-14 md:space-y-20">

      <MovieList title="New Releases"   movies={NEW_RELEASE_MOVIES} />
      <MovieList title="History Movies" movies={HISTORY_MOVIES} />
      <MovieList title="Action Movies"  movies={ACTION_MOVIES} />
      <MovieList title="Drama Movies"   movies={DRAMA_MOVIES} />
    </div>
  );
};

export default SecondaryContainer;