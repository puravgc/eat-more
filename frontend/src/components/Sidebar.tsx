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
    <div className="fixed min-w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-lg shadow-gray-500">
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
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
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