import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: null, // 👈 OBJECT, not array
    heroMovie: null,     // 👈 cached hero movie
    drama: null,
    action: null,
    popular: null,
    newRelease: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlaying = action.payload;
    },
    setHeroMovie: (state, action) => {
      state.heroMovie = action.payload;
    },
    addDramaMovies: (state, action) => {
      state.drama = action.payload;
    },
    addActionMovies: (state, action) => {
      state.action = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popular = action.payload;
    },
    addNewReleaseMovies: (state, action) => {
      state.newRelease = action.payload;
    }
  },
});

export const { addNowPlayingMovies, setHeroMovie, addDramaMovies, addActionMovies, addPopularMovies, addNewReleaseMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
