const express = require("express");
const verifyToken = require("../Midleware/auth");
const {SaveAddress, FetchAddress, DeleteAddress, updateAddress } = require("../Controller/Address");
const router = express.Router();

router.post("/addaddress", verifyToken, SaveAddress);

router.get("/addressget",verifyToken,FetchAddress);

/**************** Delete the address */
router.delete("/delete/:delid",DeleteAddress),

/*********** Update The Address  */
router.put("/update/:id",updateAddress)

module.exports = router;
