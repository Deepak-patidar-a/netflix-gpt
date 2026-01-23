import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import gptMovieReducer from "./gptMovieSlice";
import myListReducer from "./myListSlice";
import toastReducer from "./toastSlice";

const appStore = configureStore(
    {
        reducer : {
            user: userReducer,
            movies: moviesReducer,
            gpt: gptReducer,
            gptMovies: gptMovieReducer,
            myList: myListReducer,
            toast: toastReducer
        }
    }
)

export default appStore