const express = require("express");
const verifyToken = require("../Midleware/auth");
const { PaymentMethod, paymentIntent, AccountLink, PaymentRetrieve, PaymentsGet } = require("../Controller/Payment");

const router = express.Router();

router.post("/paymentmethod",verifyToken,PaymentMethod)

/****************** Payment intent */
router.post("/paymentintent",verifyToken,paymentIntent);

/************************ Create Account Link */
router.post("/accountlink",verifyToken,AccountLink);


/************************ Payment Retrieve Api */
router.get("/paymentretrieve",verifyToken,PaymentRetrieve)


/************************** Paymentmethod and userId store in DB */
router.post("/getpayments",verifyToken,PaymentsGet)

module.exports = router;