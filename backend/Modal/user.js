const { default: mongoose } = require("mongoose");
/***************** import the mongppse */
const { Schema } = mongoose;

const userregister = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    token: {
      type: String,
    },
    image: {
      type: String,
    },
    customerid:{
      type:String
    },
    accountId:{
      type:String
    },
    status:{
      type:String,
      enum:{
        values:["inactive","active","deleted"]
      }
    },
    role:{
      type:String,
      enum:{
        values:["admin","user","company"]
      }
    },
    reason:{
      type:String
    },
    isValid:{
      type:Boolean,
      default:false
    }
    
  },
  {
    timestamps: true,
  }
);

/*** change collection into modal  */
module.exports.USER = mongoose.model("users", userregister);
