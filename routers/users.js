const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JsonWebTokenError } = require("jsonwebtoken");

// Get user Lists
router.get(`/`, async (_req, res) => {
  const userList = await User.find({}).select("-passwordHash");

  if (!userList) {
    return res.status(500).json({ success: false, message: "User Not Found" });
  }
  res.send(userList);
});

// Get Single User
router.get(`/:id`, async (_req, res) => {
  const user = await User.findById(_req.params.id);

  if (!user) {
    return res.status(500).json({ success: false, message: "User Not Found" });
  }
  res.send(user);
});

// Register User
router.post(`/`, async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      street: req.body.street,
      apartment: req.body.apartment || "",
      city: req.body.city || "",
      zip: req.body.zip || "",
      country: req.body.country || "",
      phone: req.body.phone,
      isAdmin: req.body.isAdmin || false,
    });

    user = await user.save();

    if (!user) {
      return res.status(404).send("The user cannot be created");
    }
    res.send(user);
  } catch (error) {
    return res.status(400).send(`The user cannot be created!`);
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.SECRET;
    if (!user || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
      return res.status(400).send("Incorrect email or password!");
    }
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin
      },
      secret,
      {expiresIn: '7d'}
    );
    res.status(200).send({ user: user.email, token: token });
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
});

//Get User Count
router.get("/get/count", async (_req, res) => {
  try {
    const userCount = await User.countDocuments();

    if (!userCount) {
      return res
        .status(404)
        .json({ success: false, message: "Issue on your request." });
    }
    res.send({ count: userCount });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

//Delete user by id
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res.status(200).json({ success: true, message: "user deleted" });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});


module.exports = router;
