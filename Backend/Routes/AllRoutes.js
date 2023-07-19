const express = require("express");
require("dotenv").config();
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
    car_model,
    car_color,
    car_price,
    car_image,
    kms_on_odometer,
    major_scratches,
    original_paint,
    num_accidents_reported,
    num_previous_buyers,
    registration_number,
  } = req.body;

  try {
    const decoded = jwt.verify(
      req.headers.authorization?.split(" ")[1],
      "masai"
    );
    if (decoded) {
      const carExists = await Marketplace_InventoryModel.findOne({
        registration_number,
        car_image,
      });

      if (carExists) {
        return res.json({ msg: "Car Already Added to the Inventory" });
      } else {
        const newCar = new Marketplace_InventoryModel({
          car_model,
          car_price,
          car_color,
          car_image,
          kms_on_odometer,
          major_scratches,
          original_paint,
          num_accidents_reported,
          num_previous_buyers,
          registration_number,
          userId: decoded.user_id,
        });

        await newCar.save();
        return res.json({ msg: "Car Added to the Inventory" });
      }
    }
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
});

router.get("/dealer/getCar", authMiddleware, async (req, res) => {
  const decoded = jwt.verify(
    req.headers.authorization?.split(" ")[1],
    `${process.env.secretKey}`
  );

  if (!decoded) {
    return res.status(401).json({ msg: "Please Login Again" });
  }

  const { selectedPriceRange, selectedColor, selectedMileage } = req.query;
  const query = { userId: decoded.user_id };

  if (selectedPriceRange === "low to high") {
    query.car_price = { $lte: 10000 };
  } else if (selectedPriceRange === "high to low") {
    query.car_price = { $gt: 10000 };
  }

  if (selectedColor !== "all") {
    query.car_color = selectedColor;
  }

  if (selectedMileage === "low") {
    query.kms_on_odometer = { $lte: 50000 };
  } else if (selectedMileage === "medium") {
    query.kms_on_odometer = { $gt: 50000, $lte: 100000 };
  } else if (selectedMileage === "high") {
    query.kms_on_odometer = { $gt: 100000 };
  }

  try {
    const user = await Marketplace_InventoryModel.find(query);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/dealer/car/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const carExists = await Marketplace_InventoryModel.findById(id);
    if (carExists) {
      await Marketplace_InventoryModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Car deleted successfully." });
    } else {
      res.status(404).json({ message: "Car not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/dealer/car/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const {
    car_image,
    kms_on_odometer,
    major_scratches,
    original_paint,
    num_accidents_reported,
    num_previous_buyers,
    registration_number,
  } = req.body;

  try {
    const carExists = await Marketplace_InventoryModel.findById(id);
    if (carExists) {
      const updatedCar = {
        car_image,
        kms_on_odometer,
        major_scratches,
        original_paint,
        num_accidents_reported,
        num_previous_buyers,
        registration_number,
      };

      await Marketplace_InventoryModel.findByIdAndUpdate(id, updatedCar);
      res.status(200).json({ message: "Car updated successfully." });
    } else {
      res.status(404).json({ message: "Car not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/inventory", async (req, res) => {
  try {
    const { sortBy, filterBy } = req.query;

    const query = {};
    if (filterBy) {
      Object.assign(query, filterBy);
    }

    let sortQuery = {};
    if (sortBy) {
      // Assuming sortBy is an object containing sorting criteria
      // For example, { car_price: 1 } for ascending order or { car_price: -1 } for descending order
      sortQuery = sortBy;
    }

    // Fetch the inventory data with sorting and filtering
    const inventoryData = await Marketplace_InventoryModel.find(query).sort(
      sortQuery
    );

    res.json(inventoryData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = { router };
