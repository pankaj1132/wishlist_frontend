import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Home from '../pages/Home';
import SignupPage from '../pages/SignupPage';
import SigninPage from '../pages/SigninPage';
import Wishlist from '../pages/Wishlist';
import ViewWishlist from '../pages/ViewWishlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback } from 'react';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State for theme toggle

 
  const toggleTheme = useCallback(() => {
   
    setIsDarkTheme(prevTheme => {
      const newTheme = !prevTheme;
      document.body.style.backgroundColor = newTheme ? '#333' : '#fff';
      document.body.style.color = newTheme ? '#fff' : '#000';
      return newTheme;
    });
  }, [ ]);
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
          <Home isDarkTheme={isDarkTheme} />
        </>
      ),
    },
    {
      path: '/signin',
      element: (
        <>
          <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
          <SigninPage isDarkTheme={isDarkTheme} />
        </>
      ),
    },
    {
      path: '/signup',
      element: (
        <>
          <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
          <SignupPage isDarkTheme={isDarkTheme} />
        </>
      ),
    },
    {
      path: '/wishlist',
      element: (
        <>
          <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
          <Wishlist isDarkTheme={isDarkTheme} />
        </>
      ),
    },
    {
      path: '/view-wishlists',
      element: (
        <>
          <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
          <ViewWishlist isDarkTheme={isDarkTheme} />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default App;