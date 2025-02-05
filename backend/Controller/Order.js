const { default: mongoose } = require("mongoose");
const { ORDER } = require("../Modal/order");
const { USER } = require("../Modal/user");

// const SetOrder = async (req, res) => {
//   const userid = req.userId;
//   const createBy = req.body.createBy;
//   const { product, address, totalprice, MethodToUsePay } = req.body;
//   const { pincode, name, city, state, phone, fulladdress } = address;
//   const productall = {};
//   console.log(createBy, "createBy....................................");
//   for (let i = 0; i < createBy.length; i++) {
//     const createdata = createBy[i];
//     if (!productall[createdata]) {
//       productall[createdata] = [];
//     }
//     productall[createdata].push(product[i]);
//   }
//   for (createdata in productall) {
//     const neworder = await ORDER.insertMany({
//       userid: userid,
//       address: {
//         pincode: pincode,
//         name: name,
//         city: city,
//         state: state,
//         phone: phone,
//         fulladdress: fulladdress,
//       },
//       product: productall[createdata],
//       MethodToUsePay: MethodToUsePay,
//       totalprice: totalprice,
//     });
//     console.log(neworder, "new order.............@@@@@@@@@@@@@@@@@@@@@@@@@@@");

//     // const saveOrder = await neworder.save();
//     return res.status(200).send({
//       statuscode: 200,
//       message: "OKKKKKKKKKKKKKKK",
//       data: neworder,
//     });
//   }
// };

const SetOrder = async (req, res) => {
  const userid = req.userId;
  const createBy = req.body.createBy;
  const { product, address, MethodToUsePay, totalprice } = req.body;
  const { pincode, name, city, state, phone, fulladdress } = address;

  // Group products by creator
  const groupedProducts = {};
  let total = false;
  if (createBy.length === 1) {
    groupedProducts[createBy] = product;
    total = true;
  } else {
    for (let i = 0; i < createBy.length; i++) {
      const creator = createBy[i];
      if (!groupedProducts[creator]) {
        groupedProducts[creator] = [];
      }
      groupedProducts[creator].push(product[i]);
    }
  }

  console.log(total, "...............................................");

  /***************** product price add */
  // objected created for each product
  const orders = [];

  for (const creator in groupedProducts) {
    const neworder = await ORDER.insertMany({
      userid: userid,
      address: {
        pincode: pincode,
        name: name,
        city: city,
        state: state,
        phone: phone,
        fulladdress: fulladdress,
      },
      totalprice: total
        ? totalprice
        : groupedProducts[creator]
            .map((item) => item?.addtocart?.price)
            .reduce((prev, curr) => prev + curr, 0),
      product: groupedProducts[creator],
      MethodToUsePay: MethodToUsePay,
    });

    // console.log(dat, ".....................................datta is good ");

    orders.push(neworder);
  }

  return res.status(200).send({
    statuscode: 200,
    message: "Orders created successfully",
    data: orders,
  });
};

/********************* Get Order */
// const GetOrder = async (req, res) => {
//   const userid = req.userId;

//   const existed = await ORDER.aggregate([
//     {
//       $match: {
//         userid: new mongoose.Types.ObjectId(userid),
//       },
//     },
//     {
//       $lookup: {
//         from: "products",
//         let: {
//           productid: "$product.productid",
//         },
//         pipeline: [
//           {
//             $map: { input: "$product", as: "products", in:{"$$productid":"$_id"}},
//           },
//         ],
//         as: "products",
//       },
//     },
//   ]);

//   if (existed) {
//     return res.status(200).send({
//       message: "okkokok",
//       data: existed,
//       statuscode: 200,
//     });
//   } else {
//     return res.status(400).send({
//       message: "okkokok",
//       statuscode: 400,
//     });
//   }
// };

// const GetOrder = async (req, res) => {
//   const userid = req.userId;

//     const orders = await ORDER.aggregate([
//       {
//         $match: {
//           userid: new mongoose.Types.ObjectId(userid),
//         },
//       },
//       {
//         $lookup: {
//           from: "products",
//           localField: "productid",
//           foreignField: "_id",
//           as: "products",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           userid: 1,
//           "address.pincode": 1,
//           "address.city": 1,
//           "address.state": 1,
//           products: {
//             $map: {
//               input: "$product",
//               as: "product",
//               in: {
//                 _id: "$$product._id",
//                 name: "$$product.name",
//                 price: "$$product.price",

//               },
//             },
//           },
//         },
//       },
//     ]);

//     if (orders) {
//       return res.status(200).send({
//         message: "ssuccessfully",
//         data: orders,
//         statuscode: 200,
//       });
//     } else {
//       return res.status(404).send({
//         message: "No orders found",
//         statuscode: 404,
//       });
//     }

// };

const GetOrder = async (req, res) => {
  const userid = req.userId;
  try {
    const orders = await ORDER.aggregate([
      {
        $match: {
          userid: new mongoose.Types.ObjectId(userid),
        },
      },
      {
        $lookup: {
          from: "products",
          let: { productIds: "$product.productid" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$productIds"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                price: 1,
                // pawan: '$brand'
              },
            },
          ],

          as: "products",
        },
      },
      {
        $project: {
          _id: 1,
          userid: 1,
          "address.pincode": 1,
          "address.city": 1,
          "address.state": 1,
          products: {
            $map: {
              input: "$products",
              as: "product",
              in: {
                _id: "$$product._id",
                name: "$$product.name",
                price: "$$product.price",
              },
            },
          },
        },
      },
    ]);

    if (orders.length > 0) {
      return res.status(200).send({
        message: "Orders retrieved successfully",
        data: orders,
        statuscode: 200,
      });
    } else {
      return res.status(404).send({
        message: "No orders found",
        statuscode: 404,
      });
    }
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return res.status(500).send({
      message: "Internal server error",
      statuscode: 500,
    });
  }
};

/************************** test */

/********************* Companies Orders */
const CompanyOrder = async (req, res) => {
  // const userid = req.userId;
  // const data = await ORDER.find({product: { $elemMatch: { createBy: req.userId } } });
  // console.log(data,"................................");
  // const data = await ORDER.find({product: { $elemMatch: { createBy: req.userId } } })
  // const data2 = await data.aggregate

  const data2 = await ORDER.aggregate([
    {
      $match: {
        product: {
          $elemMatch: { createBy: new mongoose.Types.ObjectId(req.userId) },
        },
      },
    },
    
    {
      $lookup: {
        from: "products",
        let: {
          productdetail: {
            $map: {
              input: "$product",
              as: "productdt",
             pipeline:[
              {$match: {
                $expr: {
                  $and: [
                    { $eq: ["$_id", "$$productdt.productid"] },
                    {$eq: ["$createBy", "$$productdt.productid"]},
                  ],
                 
                },
              }},
             ],
             as: "prodata",
            },
          },
        },
        
      },
    },
  ]);
  // console.log(data2, "..................");

  if (data2) {
    return res.send({
      statuscode: 200,
      message: "kokokoko",
      data: data2,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: ";................",
    });
  }
};
/****************** Admin Order List  */
const AdminOrderList = async (req, res) => {
  const orders = await ORDER.aggregate([
    {
      $lookup: {
        from: "users",
        let: {
          userid: "$userid",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: { $eq: ["$_id", "$$userid"] },
              },
            },
          },
        ],
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    // {
    //   $lookup: {
    //     from: "products",

    //     productid: {
    //       $map: {
    //         input: "$product",
    //         as: "product_det",
    //         $match: {
    //           $expr: {
    //             $and:{$eq:["$_id","$$product.productid"]}
    //           },
    //         },
    //       },
    //     },

    //     as: "products_det",
    //   },
    // },
    /************* Product details */
    {
      $lookup: {
        from: "products",
        let: {
          productids: {
            $map: {
              input: "$product",
              as: "product_det",
              in: "$$product_det.productid",
            },
          },
        },
        pipeline: [{ $match: { $expr: { $in: ["$_id", "$$productids"] } } }],
        as: "productDetails",
      },
    },
    /******************* company details */
    {
      $lookup: {
        from: "users",
        let: {
          userdet: "$productDetails.createBy",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$userdet"],
              },
            },
          },
        ],
        as: "company_det",
      },
    },
    {
      $unwind: "$company_det",
    },

    {
      $lookup: {
        from: "categories",
        let: {
          cat_id: {
            $map: {
              input: "$productDetails",
              as: "category_det",
              in: "$$category_det.categoryId",
            },
          },
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$cat_id"],
              },
            },
          },
        ],
        as: "categoryinfo",
      },
    },
    {
      $unwind: "$categoryinfo",
    },
  ]);
  if (orders) {
    return res.send({
      statuscode: 200,
      message: "orders",
      data: orders,
    });
  } else {
    return res.send({
      statuscode: 200,
      message: "Not ok !!!",
    });
  }
};

/************************** Count Orders */
const CountOrders = async (req, res) => {
  const productId = req.body.productId;

  const count = await ORDER.countDocuments({
    product: new mongoose.Types.ObjectId(req.body.productId),
  });
  if (count) {
    return res.send({
      statuscode: 200,
      message: "ok",
      data: count,
    });
  } else {
    return res.send({
      statuscode: 200,
      message: "ok",
      data: count,
    });
  }
};

// module.exports = { GetOrder };
module.exports = {
  SetOrder,
  GetOrder,
  CompanyOrder,
  AdminOrderList,
  CountOrders,
};

// input is array ass is element or cvariable in is the condition nd project have key s which is change able

// for(let a of arr){
//   a+2
//  kdjkdjfk dj
// }
