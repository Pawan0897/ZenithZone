const express = require("express");
const verifyToken = require("../Midleware/auth");
const { AddToCart, RemoveCart, GetCart, CountCartList, UpdateQuantity } = require("../Controller/cart");
const router = express.Router();

/****************** */
router.post("/addtocart",verifyToken,AddToCart);

/************************* */
router.delete("/removecart/:id",verifyToken,RemoveCart);

/**************************** */
router.get("/getcart",verifyToken,GetCart)

/*************** count products */
router.get("/countcartlist",verifyToken,CountCartList)


/***************** increase quantity  */
router.put("/quantity",verifyToken ,UpdateQuantity)
module.exports = router;