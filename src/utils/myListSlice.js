import { createSlice } from "@reduxjs/toolkit";

const loadMyList = () => {
  try {
    const data = localStorage.getItem("myList");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveMyList = (movies) => {
  localStorage.setItem("myList", JSON.stringify(movies));
};


const initialState = {
  movies: loadMyList(),
};

const myListSlice = createSlice({
  name: "myList",
  initialState,
  reducers: {
        addToMyList: (state, action) => {
        const movie = action.payload;

        const exists = state.movies.some((m) => m.id === movie.id);
        if (exists || state.movies.length >= 8) return;

        state.movies.push({
            id: movie.id,
            title: movie.title,
            poster: movie.poster,
            rating: movie.rating || null,
        });

        saveMyList(state.movies);
        },

        removeFromMyList: (state, action) => {
        state.movies = state.movies.filter(
            (m) => m.id !== action.payload
        );

        saveMyList(state.movies);
        },

        clearMyList: (state) => {
        state.movies = [];
        localStorage.removeItem("myList");
        },
  },
});

export const {
  addToMyList,
  removeFromMyList,
  clearMyList,
} = myListSlice.actions;

export default myListSlice.reducer;
