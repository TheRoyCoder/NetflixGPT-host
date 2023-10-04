import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: [],
    movieResults: [],
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    clearMovies: (state) => {
      state.movieNames.length = [];
    },
  },
});

export const {
  toggleGptSearchView,
  addGptMovieResult,
  searchEventClick,
  clearMovies,
} = gptSlice.actions;

export default gptSlice.reducer;
