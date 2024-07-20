import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b-2 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <a href="/" className="text-red-600 font-bold text-xl">
                EAT MORE
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 justify-center items-center">
              <a
                href="#"
                className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Orders
              </a>
              <a
                href="#"
                className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <button className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </div>
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="bg-red-600 p-2 rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-600"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="text-gray-900 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Orders
          </a>
          <a
            href="#"
            className="text-gray-900 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-900 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </a>
          <a
            href="#"
            className="text-gray-900 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </a>
          <button className="text-white bg-red-600 hover:bg-red-700 block w-full text-center px-3 py-2 rounded-md text-base font-medium">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
