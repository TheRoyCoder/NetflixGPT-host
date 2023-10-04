import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    addPropularMovies: null,
    trailerVideo: null,
    addTopRatedMovies: null,
    addUpcomingMovies: null,
    playingVideos: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPropularMovies: (state, action) => {
      state.addPropularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.addTopRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.addUpcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPlayingVideo: (state, action) => {
      state.playingVideos = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPropularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addPlayingVideo,
} = movieSlice.actions;

export default movieSlice.reducer;
