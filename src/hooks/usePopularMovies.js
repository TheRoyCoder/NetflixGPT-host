import { useDispatch, useSelector } from "react-redux";
import { API_Option } from "../utils/constant";
import { addPropularMovies } from "../utils/redux/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.addPropularMovies);

  const getPropularMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_Option
    );
    const json = await data.json();
    dispatch(addPropularMovies(json.results));
  };

  useEffect(() => {
    !popularMovies && getPropularMovie();
  }, []);
};

export default usePopularMovies;
