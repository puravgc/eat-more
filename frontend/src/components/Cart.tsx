import React, { useContext, useEffect, useState } from "react";

import { IoIosClose } from "react-icons/io";
import { Bounce, toast } from "react-toastify";
import { categoryContext } from "../context/categoryContext";
import { GrSubtract, GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setcartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const { totalCartItems, settotalCartItems } = useContext(categoryContext);
  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/getcart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setcartItems(data);
        calculateTotal(data);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    settotalPrice(total);
  };

  const deleteCart = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/removefromcart/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      await settotalCartItems(totalCartItems - data.quantity);
      console.log(data);
      fetchCartItems();
      calculateTotal(cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:5000/updatecart/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify({ quantity: newQuantity }),
      });
      const data = await response.json();
      fetchCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="h-screen w-screen mt-10">
      <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                  Shopping Cart
                </h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                  3 Items
                </h2>
              </div>
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[500px] overflow-y-auto p-5">
                {cartItems.map((cartItem, index) => {
                  return (
                    <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group relative">
                      <div
                        className="absolute right-0 top-0 cursor-pointer"
                        onClick={() => {
                          deleteCart(cartItem._id);
                        }}
                      >
                        <IoIosClose className="h-10 w-10" />
                      </div>
                      <div className="w-full md:max-w-[126px]">
                        <img
                          src={cartItem.image}
                          alt="food image"
                          className="mx-auto rounded-2xl"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                        <div className="md:col-span-2">
                          <div className="flex flex-col max-[500px]:items-center gap-3">
                            <h6 className="font-semibold text-base leading-7 text-black">
                              {cartItem.productName}
                            </h6>
                            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-red-600">
                              ${cartItem.price}
                            </h6>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                          <div className="flex items-center h-full">
                            <button
                              onClick={() => {
                                updateQuantity(
                                  cartItem._id,
                                  cartItem.quantity - 1
                                );
                                if (cartItem.quantity <= 1) {
                                  deleteCart(cartItem._id);
                                }
                                settotalCartItems((prev) => prev - 1);
                              }}
                              className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                            >
                              <GrSubtract />
                            </button>
                            <input
                              type="text"
                              className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                              placeholder={cartItem.quantity}
                            />
                            <button
                              onClick={() => {
                                updateQuantity(
                                  cartItem._id,
                                  cartItem.quantity + 1
                                );
                                settotalCartItems((prev) => prev + 1);
                              }}
                              className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                            >
                              <GrAdd />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                          <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-red-600">
                            ${cartItem.quantity * cartItem.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary
              </h2>
              <div className="mt-8">
                <div className="flex items-center justify-between pb-6">
                  <p className="font-normal text-lg leading-8 text-black">
                    3 Items
                  </p>
                  <p className="font-medium text-lg leading-8 text-black">
                    ${totalPrice}
                  </p>
                </div>
                <form>
                  <label className="flex  items-center mb-1.5 text-gray-600 text-lg font-medium">
                    Pick Your Location
                  </label>
                  <div className=""></div>
                  <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                    Promo Code
                  </label>
                  <div className="flex pb-4 w-full">
                    <div className="relative w-full ">
                      <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                      <input
                        type="text"
                        className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                        placeholder="xxxx xxxx xxxx"
                      />
                      <button
                        id="dropdown-button"
                        data-target="dropdown"
                        className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                        type="button"
                      >
                        <svg
                          className="ml-2 my-auto"
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                            stroke="#6B7280"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center border-b border-gray-200">
                    <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                      Apply
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-8">
                    <p className="font-medium text-xl leading-8 text-black">
                      3 Items
                    </p>
                    <p className="font-semibold text-xl leading-8">
                      ${totalPrice}
                    </p>
                  </div>
                  <button className="w-full text-center bg-red-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-700">
                    Checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
