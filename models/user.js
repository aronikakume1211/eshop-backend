const mongoose = require("mongoose");

//User Schema
const userSchema = mongoose.Schema({
  name: String,
  image: { type: String, required: true },
  countInStock: Number,
});

// user model
module.exports = mongoose.model("User", userSchema);
