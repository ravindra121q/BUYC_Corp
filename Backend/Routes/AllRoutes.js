const express = require("express");
const { OEMModel } = require("../Models/oemModel");
const { dealerModel } = require("../Models/dealerModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../Middleware/auth_middleware");
const { Marketplace_InventoryModel } = require("../Models/inventryModel");

router.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await dealerModel.findOne({ email });

  if (userExists) {
    res.json({ msg: "User Already Exists" });
  } else {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        res.status(500).json({ msg: "Error hashing password" });
      } else {
        const newUser = new dealerModel({ name, email, password: hash });
        try {
          await newUser.save();
          res.json({ msg: "User created successfully" });
        } catch (error) {
          res.status(500).json({ msg: "Error saving user" });
        }
      }
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user_exist = await dealerModel.findOne({ email });
  if (user_exist) {
    bcrypt.compare(
      password,
      (hash = user_exist.password),
      async (err, result) => {
        if (err) {
          return res.json({ msg: "Error" });
        }
        if (result) {
          const token = jwt.sign({ user_id: user_exist._id }, `masai`, {
            expiresIn: "7d",
          });
          res.json({ msg: "Successfully Logged In", token });
        } else {
          return res.json({ msg: "Please SignUp First" });
        }
      }
    );
  } else {
    res.json({ msg: "User Not Exists" });
  }
});

router.get("/oem", async (req, res) => {
  try {
    const data = await OEMModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/dealer/car", authMiddleware, async (req, res) => {
  const {
    car_image,
    kms_on_odometer,
    major_scratches,
    original_paint,
    num_accidents_reported,
    num_previous_buyers,
    registration_number,
  } = req.body;

  const car_exists = await Marketplace_InventoryModel.findOne({
    registration_number: registration_number,
  });

  if (car_exists) {
    return res.json({ msg: "Car Already Added to the Inventory" });
  } else {
    try {
      const decoded = jwt.verify(
        req.headers.authorization?.split(" ")[1],
        "masai"
      );
      if (decoded) {
        const newCar = new Marketplace_InventoryModel({
          car_image,
          kms_on_odometer,
          major_scratches,
          original_paint,
          num_accidents_reported,
          num_previous_buyers,
          registration_number,
        });
        await newCar.save();
        return res.json({ msg: "Car Added to the Inventory" });
      }
    } catch (error) {
      res.status(401).json({ msg: "Invalid token" });
    }
  }
});

module.exports = { router };
