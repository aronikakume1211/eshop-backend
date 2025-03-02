const mongoose = require("mongoose");

//order Schema
const orderSchema = mongoose.Schema({
  name: String,
  image: { type: String, required: true },
  countInStock: Number,
});

orderSchema.virtual("id").get(() => {
  return this._id?.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

// order model
module.exports = mongoose.model("Order", orderSchema);
