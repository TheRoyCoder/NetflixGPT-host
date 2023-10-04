import { useDispatch, useSelector } from "react-redux";
import { API_Option } from "../utils/constant";
import { addUpcomingMovies } from "../utils/redux/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcoming = useSelector((store) => store.movies.addUpcomingMovies);

  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_Option
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    !upcoming && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
