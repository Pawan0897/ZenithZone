const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const address = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },

    city: {
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
  {
    timestamps: true,
  }
);
module.exports.ADDRESS = mongoose.model("adress", address);
