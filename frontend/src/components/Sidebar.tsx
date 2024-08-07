import React, { useEffect, useState, useContext, useRef } from "react";
import { categoryContext } from "../context/categoryContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCategory, setselectedCategory } = useContext(categoryContext);
  const sidebarRef = useRef(null);

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
      console.error("Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleCategoryClick = (category) => {
    setselectedCategory(category.strCategory.toLowerCase());
    setIsOpen(false); // Close sidebar when a category is selected
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      />

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:w-64 lg:h-auto lg:block`}
        role="navigation"
        aria-label="Sidebar Navigation"
      >
        <div className="flex justify-between items-center p-4 lg:hidden">
          <h2 className="text-xl font-semibold">Categories</h2>
          <button
            className="p-2 text-black"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-4 px-3 py-4 overflow-y-auto h-[calc(100vh-64px)] lg:h-auto">
          <ul className="space-y-2 font-medium w-full flex flex-col">
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  className={`w-full flex items-center justify-center p-2 text-black rounded-lg hover:text-white hover:bg-red-600 group ${
                    selectedCategory === category.strCategory.toLowerCase()
                      ? "bg-red-600 text-white"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                  aria-selected={
                    selectedCategory === category.strCategory.toLowerCase()
                  }
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

      <button
        className="lg:hidden fixed top-1/2 left-4 z-50 p-2 text-red-500 rounded-lg transform -translate-y-1/2"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isOpen ? <></> : <IoIosArrowForward className="h-8 w-8" />}
      </button>
    </>
  );
};

export default Sidebar;
