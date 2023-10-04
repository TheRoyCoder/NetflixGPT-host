import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstant";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const languageKey = useSelector((store) => store.config.lang);

  return (
    <div className=" bg-black w-screen">
      <div className="mt-0 md:-mt-60 relative z-20 pl-0 md:pl-10">
        <MovieList
          title={lang[languageKey].nowPlaying}
          movies={movies.nowPlayingMovies}
        />
        <MovieList
          title={lang[languageKey].popular}
          movies={movies.addPropularMovies}
        />
        <MovieList
          title={lang[languageKey].upComing}
          movies={movies.addUpcomingMovies}
        />
        <MovieList
          title={lang[languageKey].topRated}
          movies={movies.addTopRatedMovies}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
