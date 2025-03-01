const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");
const api = process.env.API_URL;
const productRouter = require("./routers/products");
const connectDB = require("./config/db");

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));

//Routers
app.use(`${api}/products`, productRouter);

//Database connection
connectDB();

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000${api}`);
});
