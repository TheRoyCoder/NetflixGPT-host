import React, { useEffect } from "react";
import CartItem from "../component/CartItem";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { NetflixLogo, Supported_Languages } from "../utils/constant";
import { changeLanguage } from "../utils/redux/configSlice";
import { useNavigate } from "react-router-dom";
import { BackgroundImg } from "../utils/constant";
import { removeItem } from "../utils/redux/cartSlice";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/redux/userSlice";
import lang from "../utils/languageConstant";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Cart = () => {
  const posterPath = useSelector((store) => store.cart.items);
  const languageKey = useSelector((store) => store.config.lang);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleHomePage = () => {
    navigate("/");
  };

  const handleClearItem = () => {
    dispatch(removeItem());
    toast.success("Cart Page Clear Successfully");
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed In/Up
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/cart");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // this will call when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between flex-row ">
        <img className="w-48 mx-auto md:mx-0 " src={NetflixLogo} alt="logo" />
        <div className="flex">
          <div className="mr-44 mt-8">
            {posterPath.length > 0 && (
              <>
                <h1 className="text-red-500 text-3xl font-bold">
                  {lang[languageKey].totalMovie} : {posterPath.length}
                </h1>
              </>
            )}
          </div>
          {posterPath.length === 1 && (
            <div>
              <button
                className="bg-red-500 mr-2 p-2 mt-7 rounded-lg text-white font-bold"
                onClick={handleClearItem}
              >
                <>{lang[languageKey].clear}</>
              </button>
            </div>
          )}
          {posterPath.length > 1 && (
            <div>
              <button
                className="bg-red-500 mr-2 p-2 mt-7 rounded-lg text-white font-bold"
                onClick={handleClearItem}
              >
                <>{lang[languageKey].clearAll}</>
              </button>
            </div>
          )}
          <ToastContainer />

          <div className="ml-4 md:ml-0">
            <select
              onChange={handleLanguageChange}
              className="bg-black border-solid border-2 border-white mr-2 p-[10px] mt-7 rounded-lg text-white font-bold"
            >
              {Supported_Languages.map((lang) => (
                <option key={lang.indentifier} value={lang.indentifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              className="bg-red-500 mr-2 p-2 mt-7 rounded-lg text-white font-bold"
              onClick={handleHomePage}
            >
              {lang[languageKey].homePage}
            </button>
          </div>
          <div>
            <button
              className="bg-red-500 ml-2 md:ml-0 p-2 mt-7 rounded-lg text-white font-bold"
              onClick={handleSignOut}
            >
              {lang[languageKey].signOut}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="fixed">
          <img
            className="h-screen object-cover md:h-full"
            src={BackgroundImg}
            alt="Background Image"
          />
        </div>

        <div className=" pl-24 pt-40 absolute inset-0 bg-black bg-opacity-60">
          <div className="flex flex-wrap">
            {posterPath.length === 0 && (
              <div>
                <h1 className="flex text-white font-bold text-2xl bg-red-600 p-3 rounded-lg ml-[300px] mt-[70px]">
                  <AiOutlineShoppingCart className="m-1" />{" "}
                  {lang[languageKey].emptyCart}
                </h1>
              </div>
            )}

            {posterPath.map((item) => (
              <CartItem posterPath={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
