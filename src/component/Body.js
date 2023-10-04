import React from "react";
import Login from "../pages/Login";
import Browse from "../pages/Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "../pages/Cart";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
