import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;

  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-2xl py-6 font-bold text-white">
        {" "}
        {title}{" "}
      </h1>
      <div className="flex overflow-x-scroll scrol ">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              movies={movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
