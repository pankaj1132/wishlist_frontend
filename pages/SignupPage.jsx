import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    const API_URL = import.meta.env.VITE_URL ;
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/signup`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success('Signup successful!');
        navigate('/signin'); // Redirect to signin page
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Signup failed');
      } else {
        console.error('Error:', error);
        toast.error('An error occurred during signup');
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'bg-gray-900' : 'bg-gradient-to-r from-green-400 to-blue-500'}`}>
      <div className={`shadow-lg rounded-lg p-8 w-full max-w-md ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h1 className={`text-3xl font-bold text-center mb-6 ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/signin" className="text-green-600 hover:underline">
            Signin here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;