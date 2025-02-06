const { default: mongoose } = require("mongoose");
const { PaymentIntent } = require("./Order");
const { PAYMENT } = require("../Modal/Payment");
const { PRODUCT } = require("../Modal/Product");

const stripe = require("stripe")(
  "*********************************************************"
);

// *************************** create payment &  payment method
const PaymentMethod = async (req, res) => {
  const customerid = req.user.customerid;
  const userid = req.userId;
  const tok = req.body.tokenid;
  const paymentMethod = await stripe.paymentMethods.create({
    type: "card",
    card: {
      token: tok,
    },
  });
  /************************ save data in the data base  */
  console.log(paymentMethod.id, ".......................................");

  /****************** Attached payment method to customer */
  const paymentAttached = await stripe.paymentMethods.attach(paymentMethod.id, {
    customer: customerid,
  });
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
};

/******************** payment intent means pay successfully !!!! */
const paymentIntent = async (req, res) => {
  const customerid = req.user.customerid;
  const createBy = req.body.createBy; // This should be an array of IDs
  const { totalprice, paymentmethodId } = req.body;

  try {
    // Validate that createBy is an array of valid ObjectId strings
    const validCreateByIds = createBy.map((id) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ObjectId: ${id}`);
      }
      return new mongoose.Types.ObjectId(id);
    });

    // Fetch account IDs for each createBy ID
    const accountIds = await Promise.all(
      validCreateByIds.map(async (k) => {
        const data = await PRODUCT.aggregate([
          {
            $match: {
              createBy: k, // Use the valid ObjectId directly
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "createBy",
              foreignField: "_id",
              as: "accountId",
            },
          },
          {
            $unwind: {
              path: "$accountId",
            },
          },
          {
            $project: {
              accountId: "$accountId.accountId",
              price: "$accountId.priceR",
            },
          },
        ]);
        console.log(
          data,
          ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );

        return data.length > 0 ? data[0].accountId : null; // Return the accountId or null if not found
      })
    );

    // Filter out any null account IDs
    const filteredAccountIds = accountIds.filter((id) => id !== null);

    // Create payment intents for each account
    const paymentIntents = await Promise.all(
      filteredAccountIds.map(async (accountId) => {
        return await stripe.paymentIntents.create({
          amount: Math.ceil(totalprice * 100),
          currency: "usd",
          customer: customerid,
          payment_method: paymentmethodId,
          confirm: true,
          transfer_data: {
            destination: accountId,
            amount: (Math.ceil(totalprice * 100) * 90) / 100,
          },
          automatic_payment_methods: {
            enabled: true,
          },
          return_url: "http://localhost:5173/user",
        });
      })
    );

    console.log(paymentIntents, "Payment Intents created");

    return res.status(200).send({
      data: paymentIntents,
      message: "Payments Successfully processed!",
      statuscode: 200,
    });
  } catch (error) {
    console.error("Error in payment intent:", error);
    return res.status(500).send({
      statuscode: 500,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

/************************* backup 2nd code .... */

/***********************Backup */
// const paymentIntent = async (req, res) => {
//   const customerid = req.user.customerid;
//   const createBy = req.body.createBy; // This should be an array of IDs
//   const { totalprice, paymentmethodId } = req.body;

//   try {
//     // Loop through each valid createBy ID
//     for (let k of createBy) {
//       console.log(k, "Processing for createBy ID");

//       const data = await PRODUCT.aggregate([
//         {
//           $match: {
//             createBy: k, // Use the valid ObjectId directly
//           },
//         },
//         {
//           $lookup: {
//             from: "users",
//             localField: "createBy",
//             foreignField: "_id",
//             as: "accountId",
//           },
//         },
//         {
//           $unwind: {
//             path: "$accountId",
//           },
//         },
//         {
//           $project: {
//             accountId: "$accountId.accountId",
//           },
//         },
//       ]);

//       console.log(data, "Fetched data for createBy ID");

//       // Extract account IDs
//       const accountIds = data.map((item) => item.accountId);
//       console.log(accountIds, "Account IDs");

//       // Create payment intent
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: Math.ceil(totalprice * 100),
//         currency: "usd",
//         customer: customerid,
//         payment_method: paymentmethodId,
//         confirm: true,
//         transfer_data: {
//           destination: accountIds[0], // Assuming you want to transfer to the first account
//           amount: (Math.ceil(totalprice * 100) * 90) / 100,
//         },
//         automatic_payment_methods: {
//           enabled: true,
//         },
//         return_url: "http://localhost:5173/user",
//       });

//       console.log(paymentIntent, "Payment Intent created");

//       return res.status(200).send({
//         data: paymentIntent,
//         message: "Payment Successfully !!!!",
//         statuscode: 200,
//       });
//     }
//   } catch (error) {
//     console.error("Error in payment intent:", error);
//     return res.status(500).send({
//       statuscode: 500,
//       message: "Internal server error.",
//       error: error.message,
//     });
//   }
// };

/******************************* Create Account Link  */
const AccountLink = async (req, res) => {
  const accountId = req.user.accountId;
  console.log(
    (req.user.accountId,
    "///////////////////////////////////////////////////////")
  );

  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: "https://example.com/reauth",
    return_url: "https://example.com/return",
    type: "account_onboarding",
  });

  if (accountLink) {
    return res.status(200).send({
      statuscode: 200,
      message: "link created !!!",
      data: accountLink,
    });
  } else {
    return res.status(400).send({
      statuscode: 400,
      message: "Not  created !!!",
    });
  }
};

/************************** Payment Retrieve  Api */

const PaymentRetrieve = async (req, res) => {
  const account = await stripe.accounts.retrieve(req?.user?.accountId);
  console.log(account, ":;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
  if (account) {
    if (
      account.requirements.past_due != "" &&
      account.requirements.currently_due != "" &&
      account.requirements.eventually_due != ""
    ) {
      return res.status(200).send({
        message: "Restricked!!!",
        data: account,
        verify: 3,
        statuscode: 500,
      });
    } else if (
      account.requirements.past_due == "" &&
      account.requirements.currently_due == "" &&
      account.requirements.eventually_due != ""
    ) {
      return res.status(200).send({
        message: "Enable !!!",
        data: account,
        verify: 2,
        statuscode: 400,
      });
    } else {
      return res.status(200).send({
        message: "completed !!!",
        data: account,
        verify: 1,
        statuscode: 200,
      });
    }
  }
};

/****************** method user store in db */
const PaymentsGet = async (req, res) => {
  const PaymentMethodId = req.body.PaymentMethodId;
  const data = await PAYMENT.findOne({
    userId: new mongoose.Types.ObjectId(req.userId),
    PaymentMethodId: PaymentMethodId,
  });
  if (data) {
    return res.send({
      statuscode: 200,
      message: "already have these method !!",
      data: data,
    });
  } else {
    const savedata = new PAYMENT({
      userId: req.userId,
      PaymentMethodId: PaymentMethodId,
    });
    await savedata.save();
    return res.status(200).send({
      message: "saved Payment Method !!",
      statuscode: 200,
      data: savedata,
    });
  }
};

module.exports = {
  PaymentMethod,
  paymentIntent,
  AccountLink,
  PaymentRetrieve,
  PaymentsGet,
};
