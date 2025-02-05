const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const wishlist = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
  },
  name: {
    type: String,
  },
  image:{
    type:String
  },
  price: {
    type: String,
  },
  Iswishlist:{
    type:String,
    default:false
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  // items: [
  //   {
  //     productId: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "product",
  //     },
  //     name: {
  //       type: String,
  //     },
  //     image:{
  //       type:String
  //     },
  //     price: {
  //       type: String,
  //     },
  //     addedAt: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
});

module.exports.WISHLIST = mongoose.model("wishlist", wishlist);
