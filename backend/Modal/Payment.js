const {default:mongoose} = require("mongoose");

const {Schema} = mongoose;

const payment = new Schema({
    userId:{
        type:mongoose.Types.ObjectId
    },
    PaymentMethodId:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports.PAYMENT = mongoose.model("payment",payment)