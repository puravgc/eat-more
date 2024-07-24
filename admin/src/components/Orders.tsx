import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const Orders = () => {
  const socket = io("http://localhost:5000");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on("cartdetails", (data) => {
      postCartDetails(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const postCartDetails = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/postadminorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: data.cartItems,
          paymentOption: data.paymentOption,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("New Order!");
        getOrders();
      } else {
        toast.error("Failed to place order");
        console.error("Failed to place order:", result.message);
      }
    } catch (error) {
      toast.error("Failed to place order");
      console.error("Error placing order:", error.message);
    }
  };

  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/getadminorder");
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error("Failed to fetch orders:", error.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/deleteorder/${orderId}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success("Order deleted successfully");
        getOrders();
      } else {
        toast.error("Failed to delete order");
        console.error("Failed to delete order:", result.message);
      }
    } catch (error) {
      toast.error("Failed to delete order");
      console.error("Failed to delete order:", error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="p-6 mt-20">
      <h2 className="text-2xl font-semibold mb-4">Orders List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-md shadow-lg hover:shadow-2xl transition-all duration-300 p-4 bg-white  h-[550px] overflow-y-auto"
            >
              <div className="w-full flex justify-between">
                <h3 className="text-xl font-semibold mb-2">
                  Order ID: {order._id}
                </h3>
                <RxCross2
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => handleDeleteOrder(order._id)}
                />
              </div>
              <p className="mb-2">
                Address: {order.cartItems[0]?.user?.address}
              </p>
              <p className="mb-2">
                Username: {order.cartItems[0]?.user?.username}
              </p>
              <p className="mb-2">
                Phone Number: {order.cartItems[0]?.user?.phoneNumber}
              </p>
              <div className="space-y-2">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-200 rounded-md p-2 bg-gray-50"
                  >
                    <p className="font-semibold">{item.productName}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 object-cover mt-2"
                    />
                  </div>
                ))}
                <div>
                  <h1>
                    TOTAL : $
                    {order.cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </h1>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No orders available</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
