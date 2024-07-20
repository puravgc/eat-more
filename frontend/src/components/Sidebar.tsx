import React, { useEffect, useState, useContext } from "react";
import { categoryContext } from "../context/categoryContext";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setselectedCategory } = useContext(categoryContext);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" mt-10">
      <div className="h-full px-3 py-4 overflow-y-auto flex justify-center items-center">
        <ul className="space-y-2 font-medium w-full flex flex-col">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center justify-center p-2 text-black rounded-lg hover:text-white hover:bg-red-600 group ${
                  selectedCategory === category.strCategory.toLowerCase()
                    ? "bg-red-600 text-white"
                    : ""
                }`}
                onClick={() => {
                  const lowercaseCategory = category.strCategory.toLowerCase();
                  setselectedCategory(lowercaseCategory);
                }}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {category.strCategory}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
