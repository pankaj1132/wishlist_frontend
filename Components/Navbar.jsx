import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../src/assets/wishlist.png'; 

const Navbar = ({ isDarkTheme}) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    toast.success('Logged out successfully!');
    navigate('/signin'); 

  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 border-b ${
        isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
     
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-10 mr-3"
        />
        <Link to="/" className="text-xl font-bold">
          Wishlist App
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {token ? (
          <>
            {location.pathname === '/view-wishlists' ? (
              <Link
                to="/wishlist"
                className={`px-4 py-2 rounded-md transition ${
                  location.pathname === '/wishlist' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
              >
                Create Wishlist
              </Link>
            ) : location.pathname === '/wishlist' ? (
              <Link
                to="/view-wishlists"
                className={`px-4 py-2 rounded-md transition ${
                  location.pathname === '/view-wishlists' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
              >
                View Wishlists
              </Link>
            ) : null}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="px-4 py-2 rounded-md hover:bg-gray-200 transition"
              aria-label="Sign In"
            >
              Signin
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-md hover:bg-gray-200 transition"
              aria-label="Sign Up"
            >
              Signup
            </Link>
          </>
        )}
       
      </div>
    </nav>
  );
};
}

export default Navbar;
