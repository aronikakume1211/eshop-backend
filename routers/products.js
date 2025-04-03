const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
const Category = require("../models/category");

//Get Product Lists
router.get(`/`, async (req, res) => {

  //To display ?categories=67c2e20599b8ab79a40345fc
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

//Get Product By id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "The product with the given ID was not found",
      });
    }
    res.status(200).send(product);
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

// Add product
router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(404).send("The category not found");

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated,
  });

  product = await product.save();

  if (!product) {
    return res.status(404).send("The Product cannot be created");
  }
  res.status(200).send(product);
});

//Delete product by id
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    return res.status(200).json({ success: true, message: "product deleted" });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

//Update product by ID
router.put("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.body.id)) {
    return res.status(400).send("Invalid Product ID");
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(404).send("The category not found");
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json("The product cannot be updated");
    }
    res.send(product);
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

//Get Product Count
router.get("/get/count", async (_req, res) => {
  try {
    const productCount = await Product.countDocuments();

    if (!productCount) {
      return res
        .status(404)
        .json({ success: false, message: "No featured products found." });
    }
    res.send({ count: productCount });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

//Get Featured product and limit
router.get("/get/featured/:count?", async (req, res) => {
  try {
    const limit = req.params.count ? parseInt(req.params.count) : 0;
    const products = await Product.find({ isFeatured: true }).limit(limit);

    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "No featured products found." });
    }
    res.send(products);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
