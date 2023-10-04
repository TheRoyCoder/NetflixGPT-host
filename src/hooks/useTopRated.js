import { useDispatch, useSelector } from "react-redux";
import { API_Option } from "../utils/constant";
import { addTopRatedMovies } from "../utils/redux/movieSlice";
import { useEffect } from "react";

const useTopRated = () => {
  const dispatch = useDispatch();
  const topRated = useSelector((store) => store.movies.addTopRatedMovies);

  const getTopRatedMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_Option
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    !topRated && getTopRatedMovie();
  }, []);
};

export default useTopRated;
