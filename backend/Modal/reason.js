
const { default: mongoose } = require("mongoose");
/***************** import the mongppse */
const { Schema } = mongoose;

const reason = new Schema({
    reason:{
       type:String
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:"user"
    }
},
{
    timestamps:true
}
)

module.exports.REASON = mongoose.model("Reason",reason);