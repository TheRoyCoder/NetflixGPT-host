import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  // return !movieNames ? (
  //   <SimmerUi />
  // ) : (
  return (
    <div className="p-0 mt-5 bg-black text-white bg-opacity-90">
      <div>
        <div>
          {/* <MovieList title={movieNames[0]} movies={movieResults[0]} /> */}
          {movieNames.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
