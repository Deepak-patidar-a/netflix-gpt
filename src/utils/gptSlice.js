import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch:false, // 👈 OBJECT, not array
    showMyList: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
        state.showMyList = false;
    },
    toggleMyList: (state) => {
      state.showMyList = !state.showMyList;
      state.showGptSearch = false;
    },
  },
});

export const { toggleGptSearchView , toggleMyList} = gptSlice.actions;
export default gptSlice.reducer;