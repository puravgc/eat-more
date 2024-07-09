const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
