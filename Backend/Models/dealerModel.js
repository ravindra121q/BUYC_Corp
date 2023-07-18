const { default: mongoose } = require("mongoose");

const dealerSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { versionKey: false }
);

const dealerModel = mongoose.model("dealers", dealerSchema);

module.exports = { dealerModel };
