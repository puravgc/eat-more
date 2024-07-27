import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Foods from "./Foods";
import { categoryContext } from "../context/categoryContext";
const Order = () => {
  const { selectedCategory } = useContext(categoryContext);
  return (
    <div className="flex">
      <div className=" w-1/5">
        <Sidebar />
      </div>
      <div className="w-full mt-14">
        <Foods selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Order;
