import { BrowserRouter,Routes, Route } from "react-router-dom";
import Login from "./views/Login"
import Register from "./views/Register"
import Home from "./views/Home"
import Add from "./views/Add"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<Add/>}/>
      </Routes>
    </BrowserRouter>
  );
}
