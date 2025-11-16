import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:3000/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      fetchProduct()
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/games", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Home - Clov Store</title>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-semibold tracking-wide">Clover</h1>
        <ul className="flex gap-6">
          <li>
            <a href="#" className="text-gray-500 font-semibold">
              Home
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/add')} className="hover:text-gray-500">
              Add
            </a>
          </li>
        </ul>
      </nav>
      {/* Table Section */}
      <section className="px-10 py-12">
        <h2 className="text-3xl font-bold mb-6">Product List</h2>
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-700">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">image</th>
                <th className="px-4 py-3 font-medium">name</th>
                <th className="px-4 py-3 font-medium">releaseDate</th>
                <th className="px-4 py-3 font-medium">Developer</th>
                <th className="px-4 py-3 font-medium">Genre</th>
                <th className="px-4 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {data.map((el, i) => (
                <tr className="border-b">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={el.gameImg}
                      alt={el.name}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">{el.name}</td>
                  <td className="px-4 py-3">{el.releaseDate}</td>
                  <td className="px-4 py-3">{el.developer}</td>
                  <td className="px-4 py-3">{el.genre}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(el.id)}
                      className="px-3 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Footer */}
      <footer className="text-center py-6 border-t text-gray-500 text-sm">
        © 2025 Clov Store. All rights reserved.
      </footer>
    </>
  );
}
