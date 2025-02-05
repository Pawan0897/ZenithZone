const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const category = new Schema({
  name: {
    type: String,
  },
  createBy: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
});

module.exports.CATEGORY = mongoose.model("category", category);
