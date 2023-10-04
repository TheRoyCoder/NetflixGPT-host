import React, { useRef, useState } from "react";
import Header from "../component/Header";
import { chackValidatData } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/redux/userSlice";
import { BackgroundImg } from "../utils/constant";
import lang from "../utils/languageConstant";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [isSignInFrom, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const languageKey = useSelector((store) => store.config.lang);

  const toggleSignInForm = () => {
    setIsSignForm(!isSignInFrom);
  };

  // To getting the data from the form.
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    const message = chackValidatData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    if (message) return;

    // Create a new user || Sing or SignUp
    if (isSignInFrom) {
      // Sign Up

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            // photoURL: N_Logo,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              toast.success("Sign-Up Successsfully");
            })
            .catch((error) => {
              setErrorMessage(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          setErrorMessage(errorCode + " Please Login ");
        });
    } else {
      // Sign In

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Sign In Successsfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - Please Sign Up");
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover md:h-full"
          src={BackgroundImg}
          alt="Background Image"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-full md:w-[390px] my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-2xl md:text-3xl py-4">
          {" "}
          {!isSignInFrom ? (
            <> {lang[languageKey].signIn} </>
          ) : (
            <> {lang[languageKey].signUp} </>
          )}
        </h1>
        {isSignInFrom && (
          <>
            <input
              ref={name}
              type="text"
              placeholder={lang[languageKey].namePlaceholder}
              className="p-3 my-2 w-full bg-gray-800 rounded-lg"
            />
          </>
        )}
        <input
          ref={email}
          type="text"
          placeholder={lang[languageKey].emailPlaceholder}
          className="p-3 my-2 w-full bg-gray-800 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder={lang[languageKey].passwordPlaceholder}
          className="p-3 my-2 w-full bg-gray-800 rounded-lg"
        />
        <p className="text-red-500 font-bold text-lg p-2"> {errorMessage} </p>
        <button
          className="p-3 my-5 bg-red-700 w-full rounded-lg "
          onClick={handleButtonClick}
        >
          {isSignInFrom ? (
            <div className="font-bold"> {lang[languageKey].signUp} </div>
          ) : (
            <div className="font-bold"> {lang[languageKey].signIn} </div>
          )}
          <ToastContainer />
        </button>
        <p className="py-4" onClick={toggleSignInForm}>
          {isSignInFrom ? (
            <div className="flex space-x-2">
              <p className="text-gray-400">
                {" "}
                {lang[languageKey].alreadyRegister} ?
              </p>
              <p className="cursor-pointer"> {lang[languageKey].signInNow} </p>
            </div>
          ) : (
            <div className="flex space-x-2">
              <p className="text-gray-400">
                {" "}
                {lang[languageKey].newToNetflix} ?{" "}
              </p>
              <p className="cursor-pointer"> {lang[languageKey].signUpNow} </p>
            </div>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
