// models/Product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  rating:Number
  // Add other fields as needed
});

module.exports = mongoose.model("Product", productSchema);
