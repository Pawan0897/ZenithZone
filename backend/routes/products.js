const express = require("express");
const router = express.Router();
const { AddProduct, Delete, Update, ViewAllProduct, ShowAllProduct, SearchProduct, ViewProductDetail, ChecOutProduct, AcountFind  } = require("../Controller/products");
const upload = require("../Midleware/multer");
const verifyToken = require("../Midleware/auth");
const { AddWishList, WishListCount, ShowWishList } = require("../Controller/wishlist");


/********************* add product  */
router.post("/addproduct",upload.single("image"),  AddProduct)

/**************** get All Product */
router.get("/allproduct",verifyToken,ViewAllProduct)

/******************* delete product */
router.delete("/delete/:id",Delete)

/********************** Update product  */
router.put("/update/:id",upload.single("image"), Update);

/*********************** START WISHLIST FROM PRODUCT */
router.post("/addwishlist",verifyToken,AddWishList)

/******************** Coutn all the Wish list  */
router.get("/wishlistcount",verifyToken,WishListCount)

/********************** SHOW WISHlist fro user which product seleted by thme */
router.get("/showwishlist",verifyToken,ShowWishList);
/********************* Show all product for user */
router.get("/products",verifyToken,ShowAllProduct)

/********** Search products */
router.get("/search",SearchProduct)

/************** view product detail */
router.get("/productdetails/:id",ViewProductDetail)



/*************** checkout  */
router.post("/chekoutptoduct",ChecOutProduct)


/***************** Accountid Which pY ON CLIK IN PROODUCT  */
router.post("/getaccount",AcountFind)
module.exports = router;