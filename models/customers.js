const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    min: 5,
    max: 50
  }
});

module.exports.customers = mongoose.model("customer", customerSchema);
module.exports.customerSchema = customerSchema;
