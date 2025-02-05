const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const admin = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role:{
      type:String
    },
    token:{
      type:String
    },
    isValid:{
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports.ADMIN = mongoose.model("admin", admin);
