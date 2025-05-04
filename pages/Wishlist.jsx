import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [wishlists, setWishlists] = useState([]);
  const [name, setName] = useState('');
  const [products, setProducts] = useState([{ name: '', description: '', price: '', image: '' }]);
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false); 
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
const API_URL = import.meta.env.VITE_URL ; 
 
  useEffect(() => {
    if (!token) {
      toast.error('Please login to access your wishlists.');
      navigate('/signin');
    }
  }, [token, navigate]);

  const fetchWishlists = async () => {
    try {
      const response = await axios.get(`${API_URL}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlists(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wishlists:', error);
      toast.error('Failed to fetch wishlists.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingWishlist = wishlists.find((wishlist) => wishlist.name === name);
      if (existingWishlist) {
        const updatedProducts = [...existingWishlist.products, ...products];
        await axios.put(
          `${API_URL}/wishlist/${existingWishlist._id}`,
          { name: existingWishlist.name, products: updatedProducts },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Products added to the existing wishlist!');
      } else {
        await axios.post(
          `${API_URL}/wishlist`,
          { name, products },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Wishlist created successfully!');
      }
      setName('');
      setProducts([{ name: '', description: '', price: '', image: '' }]);
      navigate('/view-wishlists');
    } catch (error) {
      console.error('Error saving wishlist:', error);
      toast.error('Failed to save wishlist.');
    }
  };


  const handleRemoveProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen py-10 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-4xl font-bold text-center mb-8 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
          Create Wishlist
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Wishlist Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <h3 className="text-2xl font-semibold">Products</h3>
          {products.map((product, index) => (
            <div key={index} className="space-y-4 border p-4 rounded-lg bg-white shadow-md">
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) =>
                  setProducts((prev) =>
                    prev.map((p, i) => (i === index ? { ...p, name: e.target.value } : p))
                  )
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={product.description}
                onChange={(e) =>
                  setProducts((prev) =>
                    prev.map((p, i) => (i === index ? { ...p, description: e.target.value } : p))
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProducts((prev) =>
                    prev.map((p, i) => (i === index ? { ...p, price: e.target.value } : p))
                  )
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={product.image}
                onChange={(e) =>
                  setProducts((prev) =>
                    prev.map((p, i) => (i === index ? { ...p, image: e.target.value } : p))
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveProduct(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove Product
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setProducts([...products, { name: '', description: '', price: '', image: '' }])}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Add Product
          </button>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Create Wishlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default Wishlist;