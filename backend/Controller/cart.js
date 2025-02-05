const { default: mongoose } = require("mongoose");
const { CART } = require("../Modal/Cart");
const { WISHLIST } = require("../Modal/wishList");
const { PRODUCT } = require("../Modal/Product");

const AddToCart = async (req, res) => {
  const userid = req.userId;
  // console.log(userid, ">>>>>>>>>>>>>>>>>>>>>>....");

  const { productid } = req.body;
  console.log(productid, "iddddddddddddd");

  const existingcart = await CART.findOne({
    userid: userid,
    productid: productid,
  });
  console.log(existingcart, "....................................>>>>>");

  if (!existingcart) {
    const data = new CART({
      userid: userid,
      productid: productid,
    });
    await data.save();
    return res.send({
      statuscode: 200,
      message: "Add Product Successfully !!!",
      data: data,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "Product is already Addedd!!!",
    });
  }
};
/******************** Remove Cart  */
const RemoveCart = async (req, res) => {
  const userid = req.userId;
  const { id } = req.params;
  //   cart id or product id what i choose ************************************************************************************

  const data = await CART.findById({ userid: userid, _id: id });
  if (data) {
    await data.deleteOne();
    return res.send({
      statuscode: 200,
      message: "Cart Remove Successfully !!!",
      data: data,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "Product Not Find !!!!",
    });
  }
};

/************************ fetch cart products */

const GetCart = async (req, res) => {
  const userid = req.userId;
  // const { productid } = req.body;
  const check = await CART.findOne({ userid: userid });
  if (!check) {
    res.send({
      statuscode: 400,
      message: "Not Found !!",
    });
  } else {
    const data = await CART.aggregate([
      {
        $match: {
          userid: new mongoose.Types.ObjectId(userid),
          // productid: new mongoose.Types.ObjectId(productid),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productid",
          foreignField: "_id",
          as: "addtocart",
        },
      },
      {
        $unwind: {
          path: "$addtocart",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          addtocart: 1,
          userid: 1,
          productid: 1,
          quantity: 1,
          price:"$addtocart.price",
          createBy: "$addtocart.createBy",
        },
      },
    ]);
    return res.send({
      statuscode: 200,
      message: "Your Cart Products !!!",
      data: data,
    });
  }
};

/************************ Count All Cart products */

const CountCartList = async (req, res) => {
  const userid = req.userId;

  const count = await CART.countDocuments({ userid: userid });
  if (count) {
    return res.send({
      statuscode: 200,
      message: "You Cart products",
      data: count,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "No Cart Products",
      data: 0,
    });
  }
};

/*********** Update Quantity */

const UpdateQuantity = async (req, res) => {
  const userId = req.userId;
  const { productid, quantity } = req.body;
  console.log(userId, "..........................................///////////");

  // const check = await CART.findOne({ userid: userid, productid: productid });
  // console.log(check,"chrckkckck>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  // const updateqty = await CART.findByIdAndUpdate(
  //   { productid: productid, userid: userid },
  //   { $set: { quantity: quantity } },
  //   { new: true }
  // );
  // return res.send({
  //   statuscode: 200,
  //   message: "quantity Updated !!!",
  //   data: updateqty,
  // });

  const data = await CART.findOneAndUpdate(
    { productid: productid, userid: userId },
    { $set: { quantity: quantity } },
    { new: true }
  );

  if (data) {
    return res.status(200).json({
      statuscode: 200,
      message: "quantity Updated !!!",
      data: data,
    });
  } else {
    return res.status(404).json({
      statuscode: 404,
      message: "Document not found",
    });
  }
};
module.exports = {
  AddToCart,
  RemoveCart,
  GetCart,
  CountCartList,
  UpdateQuantity,
};
