import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSub = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:3000/register", data);

        setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Register - Clover Store</title>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-semibold tracking-wide">Clover</h1>
        <ul className="flex gap-6">
          <li>
            <a href="index.html" className="hover:text-gray-500">
              Home
            </a>
          </li>
        </ul>
      </nav>
      {/* Register Section */}
      <section className="flex justify-center items-center min-h-screen -mt-20">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSub} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition"
            >
              Register
            </button>
            {/* Login Link */}
            <p className="text-sm text-center text-gray-500 mt-4">
              Sudah punya akun?{" "}
              <a href="#" className="text-gray-700 hover:underline">
                Login di sini
              </a>
            </p>
          </form>
        </div>
      </section>
      {/* Footer */}
      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clov Store. All rights reserved.
      </footer>
    </>
  );
}
