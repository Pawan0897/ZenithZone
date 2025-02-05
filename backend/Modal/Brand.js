const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const brand = new Schema(
  {
    name: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.BRAND = mongoose.model("brand", brand);
