import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewWishlist = () => {
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // ID of the wishlist being edited
  const [name, setName] = useState('');
  const [products, setProducts] = useState([{ name: '', description: '', price: '', image: '' }]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const token = localStorage.getItem('token'); // Get the JWT token from localStorage
  const API_URL = import.meta.env.VITE_URL;

  // Redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      toast.error('Please login to view your wishlists.');
      navigate('/signin');
    }
  }, [token, navigate]);

  // Fetch all wishlists
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

  // Delete a wishlist
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Wishlist deleted successfully!');
      setWishlists((prev) => prev.filter((wishlist) => wishlist._id !== id)); // Update state after deletion
    } catch (error) {
      console.error('Error deleting wishlist:', error);
      toast.error('Failed to delete wishlist.');
    }
  };

  // Open the edit form for a wishlist
  const handleEdit = (wishlist) => {
    setEditingId(wishlist._id);
    setName(wishlist.name);
    setProducts(wishlist.products);
  };

  // Update a wishlist
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/wishlist/${editingId}`,
        { name, products },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Wishlist updated successfully!');
      setWishlists((prev) =>
        prev.map((wishlist) =>
          wishlist._id === editingId ? response.data : wishlist
        )
      );
      setEditingId(null); // Close the edit form
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className={`min-h-screen py-10 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-4xl font-bold text-center mb-8 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
          Your Wishlists
        </h1>
        {wishlists.length === 0 ? (
          <p className="text-center text-gray-700">No wishlists found. Create one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlists.map((wishlist) => (
              <div
                key={wishlist._id}
                className={`rounded-lg overflow-hidden shadow-lg ${
                  isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white'
                }`}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{wishlist.name}</h2>
                  <ul className="space-y-4">
                    {wishlist.products.map((product, index) => (
                      <li key={index} className="flex flex-col items-center">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-40 h-40 object-cover rounded-lg mb-4"
                          />
                        )}
                        <div className="text-center">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <p className="text-blue-600 font-bold">${product.price}</p>
                          <p className="text-gray-600">{product.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center p-4 border-t">
                  <button
                    onClick={() => handleEdit(wishlist)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(wishlist._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/wishlist')}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Create New Wishlist
          </button>
        </div>
      </div>

      {/* Edit Wishlist Form */}
      {editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Wishlist</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Products</label>
                {products.map((product, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={product.name}
                      onChange={(e) =>
                        setProducts((prev) =>
                          prev.map((p, i) =>
                            i === index ? { ...p, name: e.target.value } : p
                          )
                        )
                      }
                      className="w-full px-4 py-2 border rounded-lg mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={product.description}
                      onChange={(e) =>
                        setProducts((prev) =>
                          prev.map((p, i) =>
                            i === index ? { ...p, description: e.target.value } : p
                          )
                        )
                      }
                      className="w-full px-4 py-2 border rounded-lg mb-2"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={product.price}
                      onChange={(e) =>
                        setProducts((prev) =>
                          prev.map((p, i) =>
                            i === index ? { ...p, price: e.target.value } : p
                          )
                        )
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewWishlist;