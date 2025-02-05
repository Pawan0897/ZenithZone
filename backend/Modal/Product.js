const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;
const products = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  isStock: {
    type: Number,
  },
  brandId: {
    type: mongoose.Types.ObjectId,
    ref:"brand"
  },
  quantity: {
    type: Number,
    default:1
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  createBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});
module.exports.PRODUCT = mongoose.model("Products", products);
