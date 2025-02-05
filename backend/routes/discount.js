const express = require("express");
const verifyToken = require("../Midleware/auth");
const { AddDiscount } = require("../Controller/discount");

const router = express.Router()

router.post("/adddiscount", AddDiscount);

module.exports = router;