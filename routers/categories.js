const express = require("express");
const router = express.Router();

const Category = require("../models/category");

//Get Categories
router.get(`/`, async (_req, res) => {
  const categoryList = await Category.find({});

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

//Get Category By id
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(500).json({
      success: false,
      message: "The category with the given ID was not Found",
    });
  }
  res.status(200).send(category);
});

//Post/save category
router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
  });

  category = await category.save();

  if (!category) {
    return res.status(404).send("The Category cannot be created");
  }
  res.send(category);
});

//Delete Category by ID
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, message: "Category deleted" });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

//Update Category by ID
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
      },
      { new: true }
    );
    if (!category) {
      return res.status(404).send("The Category cannot be updated");
    }
    res.send(category);
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
