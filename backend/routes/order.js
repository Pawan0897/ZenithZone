const express = require("express");
const verifyToken = require("../Midleware/auth");
const { SetOrder, GetOrder, CompanyOrder, AdminOrderList, CountOrders } = require("../Controller/Order");

const router = express.Router();

/************ Order come */
router.post("/setorder", verifyToken, SetOrder);

/*****************order listing */
router.get("/getorder", verifyToken, GetOrder);

router.get("/companyorder", verifyToken, CompanyOrder);
/*********************  delt */


router.get("/adminorder",verifyToken,AdminOrderList)

/******************** Count Orders */
router.get("/countorders",verifyToken,CountOrders)
module.exports = router;
