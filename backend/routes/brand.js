const express = require("express");
const verifyToken = require("../Midleware/auth");
const { AddBrand, GetBrand } = require("../Controller/brand");
const router = express.Router()

/**********************  Add Brand  */
router.post("/addbrand",verifyToken,AddBrand)


/**************** Get Brand  */
router.get("/getbrands",verifyToken,GetBrand)
module.exports = router;