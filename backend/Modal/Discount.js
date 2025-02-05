const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const discount = new Schema({
  userid: {
    type: mongoose.Types.ObjectId,
  },
  coupenId: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  Percent: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  expire: {
    type: Number,
  },
});
module.exports.DISCOUNT = mongoose.model("discount", discount);
