import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    gameImg: "",
    releaseDate: Number(0),
    password: "",
    developer: "",
    genre: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSub = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/games", data, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Add New Product
          </h2>
          <form onSubmit={handleSub} className="space-y-5">
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Game Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
                placeholder="Enter product name"
              />
            </div>
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-1"
              >
                gameImg
              </label>
              <input
                type="text"
                id="gameImg"
                name="gameImg"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
                placeholder="Enter category"
              />
            </div>
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium mb-1"
              >
                releaseDate
              </label>
              <input
                type="date"
                id="price"
                name="price"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
                placeholder="Enter price"
              />
            </div>
            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="block text-gray-700 font-medium mb-1"
              >
                developer
              </label>
              <input
                type="string"
                id="developer"
                name="developer"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
                placeholder="Enter stock quantity"
              />
            </div>
            {/* Image URL */}
            <div>
              <label
                htmlFor="imgUrl"
                className="block text-gray-700 font-medium mb-1"
              >
                genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
                placeholder="music"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
