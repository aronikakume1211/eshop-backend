const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv/config");

// Middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

//Routes
const categoriesRoutes = require("./routers/categories");
const productsRoutes = require("./routers/products");
const ordersRoutes = require("./routers/orders");
const usersRoutes = require("./routers/users");

const api = process.env.API_URL;

//Routers
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/users`, usersRoutes);

//Database connection
connectDB();

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000${api}`);
});
