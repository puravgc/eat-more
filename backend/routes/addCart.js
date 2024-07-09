const Cart = require("../models/CartModel");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/addtocart", async (req, res) => {
  try {
    const { productName, price, quantity, image } = req.body;
    const newItem = new Cart({
      productName,
      price,
      quantity,
      image,
    });
    await newItem.save();
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/removefromcart/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ message: "Item not found" });
    res.json({
      success: true,
      message: "Item removed from cart",
      quantity: cartItem.quantity,
    });
  } catch (error) {
    console.log(error);
  }
});
router.patch("/updatecart/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Quantity updated successfully", cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getcart", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
