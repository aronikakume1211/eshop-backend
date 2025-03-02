const mongoose = require("mongoose");

//category Schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#000",
  },
  icon: {
    type: String,
    default: "",
  },
});

categorySchema.virtual("id").get(() => {
  return this._id?.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
});


// category model
module.exports = mongoose.model("Category", categorySchema);
