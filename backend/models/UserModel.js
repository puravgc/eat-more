const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  promoCode: { type: Boolean },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
