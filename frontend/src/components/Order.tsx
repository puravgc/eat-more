import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Foods from "./Foods";
import { categoryContext } from "../context/categoryContext";
const Order = () => {
  const { selectedCategory } = useContext(categoryContext);
  return (
    <div className="h-screen w-screen flex">
      <div className="mt-7">
        <Sidebar />
      </div>
      <div className="mt-16">
        <Foods selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Order;
