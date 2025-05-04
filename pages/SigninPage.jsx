import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false); 
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_URL ;

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/signin`, {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success('Signin successful!');
        localStorage.setItem('token', response.data.token); 

    
        const token = response.data.token;
        const wishlistResponse = await axios.get(`${API_URL}/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        if (wishlistResponse.data.length > 0) {
          navigate('/view-wishlists', { state: { wishlists: wishlistResponse.data } });
        } else {
          navigate('/wishlist'); 
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Signin failed');
      } else {
        console.error('Error:', error);
        toast.error('An error occurred during signin');
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
      <div className={`shadow-lg rounded-lg p-8 w-full max-w-md ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h1 className={`text-3xl font-bold text-center mb-6 ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Sign In</h1>
        <form onSubmit={handleSignin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Signup here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;