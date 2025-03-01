// /home/mebratu/gitlab/Personal Projects/E-Commerce/Backend/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { dbName: "eshop-database" });
        console.log("Database connection is ready....");
    } catch (err) {
        console.log("error: ", err);
    }
};

module.exports = connectDB;
