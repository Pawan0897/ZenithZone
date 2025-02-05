const { PRODUCT } = require("../Modal/Product");
const { WISHLIST } = require("../Modal/wishList");

const AddWishList = async (req, res) => {
  const userId = req.userId;
  const { _id, name, image, price } = req.body;
  const check = await WISHLIST.findOne({ userId: userId, productId: _id });
  // console.log(check, "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}");
  if (check) {
    await WISHLIST.findByIdAndDelete(check._id);
    return res.send({
      statuscode: 200,
      message: "Remove Sucessfully !!!",
    });
  } else {
    const data = new WISHLIST({
      userId: userId,
      productId: _id,
      name,
      image,
      price,
      Iswishlist: true,
    });

    await data.save();
    // await WISHLIST.updateOne(
    //   { productId: _id },
    //   { $set: { Iswishlist: "true" } },
    //   { new: true }
    // );
    return res.send({
      statuscode: 200,
      message: "Wishlist Add Successfully !!!",
      data: data,
    });
  }
};

/******************** count all the wishlist */
const WishListCount = async (req, res) => {
  const userId = req.userId;

  const count = await WISHLIST.countDocuments({ userId: userId });
  if (count) {
    return res.send({
      statuscode: 200,
      message: "Your Wishlist !!",
      data: count,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "No Wish List!!",
      data: 0,
    });
  }
};
/*************** Show List */

/************** show wishlist for user  */
const ShowWishList = async (req, res) => {
  const userId = req.userId;
  const showlist = await WISHLIST.find({ userId: userId });
  console.log("....................", showlist);

  if (showlist) {
    return res.send({
      statuscode: 200,
      message: "Your wishlist !!!",
      data: showlist,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "Empty Wishlist !!!",
      data: "No Wishlist !!!!!",
    });
  }
};

module.exports = { AddWishList, WishListCount, ShowWishList };
