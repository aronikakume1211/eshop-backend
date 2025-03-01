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

// category model
module.exports = mongoose.model("Category", categorySchema);
