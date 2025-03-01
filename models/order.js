const mongoose = require("mongoose");

//order Schema
const orderSchema = mongoose.Schema({
  name: String,
  image: { type: String, required: true },
  countInStock: Number,
});

// order model
module.exports = mongoose.model("Order", orderSchema);
