import { createSlice } from "@reduxjs/toolkit";

const gptMovieSlice = createSlice({
  name: "gptMovies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchGptMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGptMoviesSuccess(state, action) {
      state.movies = action.payload;
      state.loading = false;
    },
    fetchGptMoviesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearGptMovies(state) {
      state.movies = [];
    },
  },
});

export const {
  fetchGptMoviesStart,
  fetchGptMoviesSuccess,
  fetchGptMoviesFailure,
  clearGptMovies,
} = gptMovieSlice.actions;

export default gptMovieSlice.reducer;
