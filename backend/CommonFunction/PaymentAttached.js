const stripe = require("stripe")(
    "sk_test_51QY3TxAuVinPkX1gWbFZJHUT76QNdEP1ZILrzu5EN4UaCa6Yk4oISVmudF2ao9f6GeISaPcRGYqeCylHKfADiCJH00bzrujrvF"
  );
const PaymentAttached = async(PaymentMethod,customerid) => {
        const paymentAttached = await stripe.paymentMethods.attach(
            PaymentMethod,
                {
                  customer: customerid,
                }
              );
              if (paymentAttached) {
                return res.status(200).send({
                  statuscode: 200,
                  messsage: "successfully !!!",
                  data: paymentAttached,
                });
              } else {
                return res.status(400).send({
                  messsage: "Failed !!!",
                });
              }
}
module.exports = {PaymentAttached}