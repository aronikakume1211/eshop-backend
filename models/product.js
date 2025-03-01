const mongoose = require("mongoose");

//Product Schema
const productSchema = mongoose.Schema({
    name: String,
    image: { type: String, required: true },
    countInStock: Number,
  });
  
  // Product model
  module.exports = mongoose.model("Product", productSchema);