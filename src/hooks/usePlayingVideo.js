import { useEffect } from "react";
import { API_Option } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addPlayingVideo } from "../utils/redux/movieSlice";

const usePlayingVideo = (movieId) => {
  const dispatch = useDispatch();
  // const playvideo = useSelector((store) => store.movies.playingVideo);

  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_Option
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addPlayingVideo(trailer));
  };

  useEffect(() => {
    // !playvideo && getMovieVideo();
    getMovieVideo();
  }, []);
};

export default usePlayingVideo;
