const { default: mongoose } = require("mongoose");

const Marketplace_InventorySchema = {
  car_model: String,
  car_image: String,
  car_price: Number,
  car_color: String,
  kms_on_odometer: Number,
  major_scratches: Boolean,
  original_paint: Boolean,
  num_accidents_reported: Number,
  num_previous_buyers: Number,
  registration_number: String,

  userId: String,
};

const Marketplace_InventoryModel = mongoose.model(
  "inventory",
  Marketplace_InventorySchema
);

module.exports = { Marketplace_InventoryModel };
