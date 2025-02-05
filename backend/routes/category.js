const express = require("express");
const verifyToken = require("../Midleware/auth");
const { addCategory, ShowCategory, Category_Product, DeletCategory } = require("../Controller/category");
const router = express.Router();

router.post("/addcategory",verifyToken,addCategory);

/****************** show category */
router.get("/showcategory",ShowCategory)

/****************** show products from category */
router.get("/categoryproducts/:catid",Category_Product)


/************************** category delete  */
router.delete("/delete/:id",DeletCategory)

module.exports = router;