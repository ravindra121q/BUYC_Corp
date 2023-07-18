const mongoose = require("mongoose");

const OEMSchema = mongoose.Schema(
  {
    id: String,
    model_name: String,
    year: Number,
    list_price: Number,
    available_colors: Array,
    mileage: Number,
    power_bhp: Number,
    max_speed: Number,
  },
  { versionKey: false }
);

const OEMModel = mongoose.model("oem_cars", OEMSchema);

module.exports = { OEMModel };
