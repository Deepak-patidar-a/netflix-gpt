import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import gptMovieReducer from "./gptMovieSlice";

const appStore = configureStore(
    {
        reducer : {
            user: userReducer,
            movies: moviesReducer,
            gpt: gptReducer,
            gptMovies: gptMovieReducer,
        }
    }
)

export default appStore