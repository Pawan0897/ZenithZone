const { default: mongoose, now } = require("mongoose");

const { Schema } = mongoose;

const order = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
    },
    address: {
      name: {
        type: String,
      },
      city: {
        type: String,
      },
      phone: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: Number,
      },
      fulladdress: {
        type: String,
      },
    },
    product: [
      {
        productid: {
          type: mongoose.Types.ObjectId,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
        createBy: {
          type: mongoose.Types.ObjectId,
        },
      },
    ],
    totalprice: {
      type: Number,
    },
    price:{
      type:Number
    },
    MethodToUsePay: {
      type: String,
    },
    orderDate: {
      type: Date,
      default: Date.now(),
    },

    status: {
      type: String,
      enum: ["pending", "shipped", "Ready for Shipping","delevered", "cancelled"],
      default:"pending"
    },
  },
  {
    timestamps: true,
  }
);

module.exports.ORDER = mongoose.model("order", order);
