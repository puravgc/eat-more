import React, { useState } from "react";
import Hero from "./components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Nopage from "./components/Nopage";
import Order from "./components/Order";
import { categoryContext } from "./context/categoryContext";
import { userContext } from "./context/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/Cart";

const App = () => {
  const [selectedCategory, setselectedCategory] = useState("beef");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [totalCartItems, settotalCartItems] = useState(0)
  return (
    <BrowserRouter>
      <div className="h-screen w-screen overflow-x-hidden">
        <categoryContext.Provider
          value={{ selectedCategory, setselectedCategory,totalCartItems,settotalCartItems }}
        >
          <userContext.Provider value={{ isLoggedIn, setisLoggedIn }}>
            <Navbar />
            <ToastContainer />
            <Routes>

              <Route path="/" element={<Hero />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/order" element={<Order />} />
              <Route path="/cart" element={<Cart/>}/>
              <Route path="*" element={<Nopage />} />
            </Routes>
          </userContext.Provider>
        </categoryContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
