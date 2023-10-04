import React from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { GoInfo } from "react-icons/go";

const VideoTitle = ({ title, overview }) => {
  const languageKey = useSelector((store) => store.config.lang);

  return (
    <div className=" w-screen aspect-video pt-[14%] px-16 absolute text-white bg-gradient-to-r from-black ">
      {/* <div className="pt-36 px-12 absolute text-white  "> */}
      <h1 className="text-xl md:text-4xl font-bold ">{title} </h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/2 ">
        {" "}
        {overview.substring(0, 140)}...{" "}
      </p>
      <div className="flex">
        <button className="px-3 md:px-6 rounded-lg bg-white text-black text-xl hover:bg-opacity-60 ">
          <div className="flex">
            <AiOutlinePlayCircle className="mt-[5px] mr-1 " />
            {lang[languageKey].play}
          </div>
        </button>
        <button className="p-2 px-6 mx-2 rounded-lg bg-gray-700 text-white text-xl ">
          <div className="flex">
            <GoInfo className="mt-[5px] mr-2 " />
            {lang[languageKey].moreInfo}
          </div>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
