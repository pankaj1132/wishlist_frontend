import React, { useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from "../pages/Home";
import SignupPage from "../pages/SignupPage";
import SigninPage from "../pages/SigninPage";
import Wishlist from "../pages/Wishlist";
import ViewWishlist from "../pages/ViewWishlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const isDarkThemeRef = useRef(true); 

  const toggleTheme = () => {
    console.log("Toggling theme");
    isDarkThemeRef.current = !isDarkThemeRef.current; 
    const newTheme = isDarkThemeRef.current;

       document.body.style.backgroundColor = newTheme ? "#333" : "#fff";
    document.body.style.color = newTheme ? "#fff" : "#000";
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar isDarkTheme={isDarkThemeRef.current} toggleTheme={toggleTheme} />
          <Home isDarkTheme={isDarkThemeRef.current} />
        </>
      ),
    },
    {
      path: "/signin",
      element: (
        <>
          <Navbar isDarkTheme={isDarkThemeRef.current} toggleTheme={toggleTheme} />
          <SigninPage isDarkTheme={isDarkThemeRef.current} />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar isDarkTheme={isDarkThemeRef.current} toggleTheme={toggleTheme} />
          <SignupPage isDarkTheme={isDarkThemeRef.current} />
        </>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <>
          <Navbar isDarkTheme={isDarkThemeRef.current} toggleTheme={toggleTheme} />
          <Wishlist isDarkTheme={isDarkThemeRef.current} />
        </>
      ),
    },
    {
      path: "/view-wishlists",
      element: (
        <>
          <Navbar isDarkTheme={isDarkThemeRef.current} toggleTheme={toggleTheme} />
          <ViewWishlist isDarkTheme={isDarkThemeRef.current} />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar />
    </>
  );
};

export default App;
