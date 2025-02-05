const {default:mongoose} = require("mongoose");

const {Schema} = mongoose

const cart = new Schema({
    userid:{
        type:mongoose.Types.ObjectId,
    },
    productid:{
     type:mongoose.Types.ObjectId
    },
    quantity:{
        type:Number,
        default:1
    },
    addedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports.CART = mongoose.model("cart",cart)