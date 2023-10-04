import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/redux/userSlice";
import { useDispatch } from "react-redux";
import { NetflixLogo, Supported_Languages } from "../utils/constant";
import { clearMovies, toggleGptSearchView } from "../utils/redux/gptSlice";
import { changeLanguage } from "../utils/redux/configSlice";
import lang from "../utils/languageConstant";
import { ToastContainer, toast } from "react-toastify";
import { Badge } from "antd";
import { HiOutlineLanguage } from "react-icons/hi2";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const languageKey = useSelector((store) => store.config.lang);
  const movieNames = useSelector((store) => store.gpt.movieNames);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Sign-out Successful");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
    toast.success("Sign-out Successful");
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
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // this will call when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleCartPage = () => {
    navigate("/cart");
  };

  const clearGptPage = () => {
    dispatch(clearMovies());
  };

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <>
      <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between flex-col md:flex-row">
        <img className="w-48 mx-auto md:mx-0 " src={NetflixLogo} alt="logo" />

        <div className="flex">
          {movieNames.length && (
            <>
              <div>
                <button
                  className="bg-red-500 mr-2 p-2 mt-7 rounded-lg text-white font-bold"
                  onClick={clearGptPage}
                >
                  Clear
                </button>
              </div>
            </>
          )}

          <div className="ml-4 md:ml-0 flex bg-black border-solid border-2 border-white mr-2 p-[0px] mt-7 mb-[10px] rounded-lg text-white font-bold">
            <HiOutlineLanguage className="mt-[10px] ml-1 " />
            <select
              onChange={handleLanguageChange}
              className="bg-black rounded-lg"
            >
              {Supported_Languages.map((lang) => (
                <option key={lang.indentifier} value={lang.indentifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          {user && (
            <>
              <div className="mr-1">
                <Badge
                  className="bg-red-500 p-[6px] mt-7 mr-2 rounded-lg text-white font-bold"
                  count={cartItems?.length}
                  showZero
                >
                  <button
                    className="bg-red-500 mr-2 font-bold text-lg"
                    onClick={handleCartPage}
                  >
                    {lang[languageKey].cart}
                  </button>
                </Badge>
              </div>

              <div>
                <button
                  onClick={handleGptSearchClick}
                  className="bg-red-500 mr-2 p-2 mt-7 rounded-lg text-white font-bold"
                >
                  {showGptSearch ? (
                    <>{lang[languageKey].homePage}</>
                  ) : (
                    <>{lang[languageKey].GptSearch}</>
                  )}
                </button>
              </div>
              {/* <img
                className="hidden md:inline-block w-16 h-16 mt-4 p-2"
                alt="userIcon"
                src={user?.photoURL}
              /> */}
              <div>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 ml-2 md:ml-0 p-2 mt-7 rounded-lg text-white font-bold"
                >
                  {lang[languageKey].signOut}
                  <ToastContainer />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
