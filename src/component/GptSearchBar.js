import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAi";
import { API_Option } from "../utils/constant";
import { addGptMovieResult } from "../utils/redux/gptSlice";

const GptSearchBar = () => {
  const languageKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // Search Movie in TMDB Api
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_Option
    );
    const json = await data.json();
    console.log(json);
    return json.results;
  };

  // Make an Api call to open AI
  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma seperated like example result given ahead. Example Result: Gadar, Don, Sholay, Golmaal, Koi Mil Gaya, ";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    const gptMovie = gptResults.choices[0]?.message?.content.split(",");

    // For each movie I will search TMDB Api for details
    const data = gptMovie.map((movie) => searchMovieTMDB(movie));
    const TMDBResults = await Promise.all(data);
    dispatch(
      addGptMovieResult({ movieNames: gptMovie, movieResults: TMDBResults })
    );
  };

  return (
    <div className=" pt-[50%] md:pt-[11%] flex justify-center">
      <form
        className=" w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 my-4 ml-4 col-span-9 rounded-lg"
          placeholder={lang[languageKey].gptSearchPlaceholder}
        />
        <button
          className="px-4 my-4 mx-2 md:mx-4 col-span-3 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
