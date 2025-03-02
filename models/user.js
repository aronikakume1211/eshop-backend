const mongoose = require("mongoose");

//User Schema
const userSchema = mongoose.Schema({
  name: String,
  image: { type: String, required: true },
  countInStock: Number,
});

userSchema.virtual("id").get(() => {
  return this._id?.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});


// user model
module.exports = mongoose.model("User", userSchema);
