import React from 'react';

const Home = ({ isDarkTheme }) => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <h1 className={`text-5xl font-bold mb-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
        Welcome to the Wishlist App
      </h1>
      <p className="text-lg mb-6 text-center">
        Create and manage your wishlists easily with our simple and intuitive interface.
      </p>
      <div className="flex space-x-4">
        <a
          href="/signin"
          className={`px-6 py-3 font-semibold rounded-lg shadow-md transition ${
            isDarkTheme
              ? 'bg-blue-700 text-white hover:bg-blue-800'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Sign In
        </a>
        <a
          href="/signup"
          className={`px-6 py-3 font-semibold rounded-lg shadow-md transition ${
            isDarkTheme
              ? 'bg-gray-700 text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Home;