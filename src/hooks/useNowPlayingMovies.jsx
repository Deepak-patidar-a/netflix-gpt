import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHeroMovie,
} from "../utils/moviesSlice";
import { HERO_MOVIES } from "../mock/heroMovies";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const heroMovie = useSelector((store) => store.movies.heroMovie);

  useEffect(() => {
    if (heroMovie) return; // already have hero movie{
      
     const randomHero = HERO_MOVIES[Math.floor(Math.random() * HERO_MOVIES.length)];
     dispatch(setHeroMovie(randomHero));
   },[]);
};

export default useNowPlayingMovies;
