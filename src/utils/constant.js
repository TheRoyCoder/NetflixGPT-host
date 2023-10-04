export const BackgroundImg =
  "https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_medium.jpg";

export const NetflixLogo =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

// export const N_Logo =
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Eo_circle_red_letter-n.svg/512px-Eo_circle_red_letter-n.svg.png?20200417173718";

export const API_Option = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/original/";

export const Supported_Languages = [
  { indentifier: "en", name: "English" },
  { indentifier: "hindi", name: "हिंदी" },
  { indentifier: "spanish", name: "Spanish" },
];
