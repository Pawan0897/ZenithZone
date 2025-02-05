const { pipeline } = require("nodemailer/lib/xoauth2");
const { CATEGORY } = require("../Modal/category");
const { PRODUCT } = require("../Modal/Product");
const { default: mongoose } = require("mongoose");

const addCategory = async (req, res) => {
  const userId = req.userId;
  const { name, createBy } = req.body;

  const category = new CATEGORY({
    name,
    createBy: userId,
  });
  const data = category.save();
  if (data) {
    res.send({
      statuscode: 200,
      message: "Category Addedd successfully !!",
      data: category,
    });
  } else {
    res.send({
      statuscode: 400,
      message: "Wrong !!",
    });
  }
};

const ShowCategory = async (req, res) => {
  const data = await CATEGORY.find();
  if (data) {
    return res.send({
      statuscode: 200,
      message: "categories !!!",
      data: data,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "Empty Categoryies !!!",
      data: "No Category !!",
    });
  }
};
/********************* Using category fetch products */

const Category_Product = async (req, res) => {
  const { catid } = req.params;
  if (!catid) {
    return res.send({
      statuscode: 400,
      message: "Not find products",
    });
  } else {
    const data = await CATEGORY.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(catid),
        },
      },
      {
        $lookup: {
          from: "products" /*** collection name of category  which you want to joint */,
          localField: "_id" /*** category  fields  */,
          foreignField: "categoryId" /*** fields of product */,
          as: "category" /**** ?????? name of these joint data create new field in doc like category */,
        },
      },
    ]);
    return res.send({
      statuscode: 200,
      message: "you Have products",
      data: data,
    });
  }
};
/******************** DElete Category */
const DeletCategory =async(req,res) => {
  const {id} = req.params;
  const existed = await CATEGORY.findByIdAndDelete(id);
  if(existed){
    return res.send({
      statuscode:200,
      message:"Sucessfully deleted !!",
      data:existed
    })
  }
  else{
    return res.send({
      statuscode:400,
      message:"No deleted !!"
    })
  }
}
module.exports = { addCategory, ShowCategory, Category_Product,DeletCategory };
