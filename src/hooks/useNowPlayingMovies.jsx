import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNowPlayingMovies,
  setHeroMovie,
} from "../utils/moviesSlice";
import { OPTIONS, URL } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const heroMovie = useSelector((store) => store.movies.heroMovie);

  const getNowPlayingMovies = async () => {
    const res = await fetch(URL, OPTIONS);
    const data = await res.json()

    dispatch(addNowPlayingMovies(data))

    // 🔥 CACHE HERO MOVIE ONLY ONCE
    if (!heroMovie) {
      dispatch(setHeroMovie(data));
    }
  };

  useEffect(() => {
    if (!heroMovie) {
      getNowPlayingMovies();
    }
  }, []);
};

export default useNowPlayingMovies;
