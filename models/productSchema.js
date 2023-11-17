const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  //   data:
  //     {
  
  name: String,
  brand: String,
  category: String,
  price: Number,
  imageURL: String,
  // }
});
module.exports = mongoose.model("products", productSchema);
