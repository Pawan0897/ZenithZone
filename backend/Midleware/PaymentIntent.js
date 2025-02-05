const PaymentIntent = async (req, res) => {
  const { totalprice, customerid, paymentmethodId } = req.body;
  const stripe = require("stripe")(
    "sk_test_51QY3TxAuVinPkX1gWbFZJHUT76QNdEP1ZILrzu5EN4UaCa6Yk4oISVmudF2ao9f6GeISaPcRGYqeCylHKfADiCJH00bzrujrvF"
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalprice,
    currency: "usd",
    customer: customerid,
    payment_method: paymentmethodId,
    confirm: true,
    automatic_payment_methods: {
      enabled: true,
    },
    return_url: "http://localhost:5173/user/checkout",
  });
  if (paymentIntent) {
    return res.status(200).send({
      data: paymentIntent,
      message: "Payment Successfully !!!!",
      statuscode: 200,
    });
  } else {
    return res.status(400).send({
      data: paymentIntent,
      message: "Failed !!!!",
      statuscode: 400,
    });
  }
};

module.exports = { PaymentIntent };
