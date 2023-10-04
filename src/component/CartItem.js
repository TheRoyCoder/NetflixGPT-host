import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

const CartItem = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <>
      <div>
        <img
          className="w-[200px] h-[300px] m-2"
          alt="Movie card"
          src={IMG_CDN_URL + posterPath}
        />
      </div>
    </>
  );
};

export default CartItem;
