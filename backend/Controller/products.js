const { default: mongoose } = require("mongoose");
const { PRODUCT } = require("../Modal/Product");
const { CART } = require("../Modal/Cart");
const { USER } = require("../Modal/user");
const { Types } = require("twilio/lib/rest/content/v1/content");

/*************** Add Products ............ */
const AddProduct = async (req, res) => {
  let image = req.file.path;
  const { name, price, description, isStock, brandId, categoryId, createBy } =
    req.body;
  console.log("image-----", image);
  const product = new PRODUCT({
    name,
    price,
    description,
    isStock,
    brandId,
    image,
    categoryId,
    createBy,
  });
  console.log(image, "...................................");
  const addProduct = await product.save();
  return res.send({
    statuscode: 200,
    message: "successfully Addedd !!!",
    data: addProduct,
  });
};

/******************delete product */
const Delete = async (req, res) => {
  const { id } = req.params;
  console.log(id, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

  const del = await PRODUCT.deleteOne({ _id: id });
  res.send({
    statuscode: 200,
    message: "Successfully Deleted !!",
    data: del,
  });
};

/******************** update Products */

const Update = async (req, res) => {
  const { id } = req.params;
  let upimage = req.file.path;
  const { name, price, description, isStock, brandId } = req.body;

  const update = await PRODUCT.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        price: price,
        image: upimage,
        description: description,
        isStock: isStock,
        brandId: brandId,
      },
    },
    { new: true }
  );

  return res.send({
    statuscode: 200,
    message: "SUcessfully updated !!",
    data: update,
  });
};

/*************************  get all product  fro companyy !!*/
const ViewAllProduct = async (req, res) => {
  const userId = req.userId;
  console.log(userId, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
  const data = await PRODUCT.aggregate([
    {
      $match: {
        createBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "brands",
        let: {
          createBy: "$createBy",
          brandId: "$brandId",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$$createBy", "$createdBy"] },
                  { $eq: ["$$brandId", "$_id"] },
                ],
              },
            },
          },
        ],
        as: "brands",
      },
    },
    {
      $unwind:"$brands"
    },
    {
      $project: {
        brands: 1,
        name: 1,
        price: 1,
        image: 1,
        description: 1,
        isStock: 1,
        brandId: 1,
      },
    },
  ]);
  // const viewdata = await PRODUCT.find({ createBy: userId });
  return res.send({
    statuscode: 200,
    message: "Show all product",
    data: data,
  });
};

/************************START WISHLIST from product */
/************************ get all product for user */
const ShowAllProduct = async (req, res) => {
  const userId = req.userId;
  let showlt = {};
  if (req.query.name) {
    showlt = {
      name: { $regex: new RegExp(req.query.name, "i") },
    };
  }
  const data = await PRODUCT.aggregate([
    /**************** category matched */
    {
      $lookup: {
        from: "categories",
        foreignField: "_id",
        localField: "categoryId",
        as: "categoryitem",
      },
    },
    {
      $unwind: {
        path: "$categoryitem",
      },
    },
    /****************** match and wishlist add true false */
    {
      $lookup: {
        from: "wishlists",
        let: {
          // define for using the inside of pipeline
          userId: new mongoose.Types.ObjectId(userId), // req.token se le hain
          productid: "$_id", // id of products
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$productId", "$$productid"] }, // $$ means which is let can defined and $ is currend doc of wishlist
                  { $eq: ["$userId", "$$userId"] },
                ],
              },
            },
          },
        ],
        as: "Iswishlist",
      },
    },
    /**************** using project */
    {
      $project: {
        name: 1,
        price: 1,
        description: 1,
        image: 1,
        brandId: 1,
        isStock: 1,
        quantity: 1,
        categoryitem:1,
        createBy: 1,
        isStock: 1,
        Iswishlist: { $anyElementTrue: ["$Iswishlist"] },
      },
    },
    { $match: showlt },
  ]);
  /***************** data length */
  if (data.length > 0) {
    return res.send({
      statuscode: 200,
      message: "your products !!!",
      data: data,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "No products !!!",
      data: data,
    });
  }
};

/****************** Search Products In User */
const SearchProduct = async (req, res) => {
  // const {name} = req.query.name;
  // console.log("neme>>>>>>>>" ,name);
  // const showlt = await PRODUCT.find({name:name})
  const showlt = await PRODUCT.find({
    name: { $regex: new RegExp(req.query.name, "i") },
  });
  return res.send({
    statuscode: 200,
    message: "ok",
    data: showlt,
  });
};
// async function viewAllProductsForUsers(req, res) {
//   const userId = req.userId ? req.userId : null;
//   let pageNo = req.query.page || 1;
//   let pageLimit = req.query.pageLimit || 10;
//   let searchQuery = {};
//   if (req.query.search) {
//     searchValue = {
//       $regex: req.query.search,
//       $options: "i",
//     };
//     searchQuery = {
//       $or: [
//         { name: searchValue },
//         { brand: searchValue },
//         { description: searchValue },
//         { category: searchValue },
//         { features: searchValue },
//       ],
//     };
//   }

//   /*************Min Max */
//   if (req.query.minPrice || req.query.maxPrice) {
//     const minPrice = parseFloat(req.query.minPrice) || 0;
//     const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
//     searchQuery.price = {
//       $gte: minPrice,
//       $lte: maxPrice,
//     };
//   }

//   try {
//     const findProducts = await products.aggregate([
//       {
//         $lookup: {
//           from: "categories",
//           localField: "category",
//           foreignField: "_id",
//           as: "categoryInfo",
//         },
//       },
//       {
//         $unwind: {
//           path: "$categoryInfo",
//         },
//       },
//       {
//         $lookup: {
//           from: "wishlists",
//           let: {
//             userId: new mongoose.Types.ObjectId(userId),
//             productId: "$_id",
//           },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$$productId", "$productId"] },
//                     { $eq: ["$createdBy", "$$userId"] },
//                   ],
//                 },
//               },
//             },
//           ],
//           as: "wishItem",
//         },
//       },
//       // {

//       {
//         $project: {
//           name: 1,
//           brand: 1,
//           price: 1,
//           description: 1,
//           features: 1,
//           category: "$categoryInfo.category",
//           image: 1,
//           wishItem: { $anyElementTrue: ["$wishItem"] },
//         },
//       },
//       { $match: searchQuery },
//       {
//         $sort: {
//           _id: -1,
//         },
//       },
//       {
//         $facet: {
//           data: [{ $skip: pageLimit * (pageNo - 1) }, { $limit: pageLimit }],
//           count: [{ $count: "count" }],
//         },
//       },
//     ]);
//     if (!findProducts) {
//       return res.status(400).json({
//         statusCode: 400,
//         message: "Product not found",
//       });
//     }
//     return res.status(200).json({
//       statusCode: 200,
//       message: "Products found successfully",
//       totalCount: findProducts[0]?.count[0]?.count,
//       data: findProducts[0]?.data,
//     });
//   } catch (error) {
//     console.log("error----", error);
//     return res.status(500).json({
//       statusCode: 500,
//       message:
//         "An error occurred while removing the product from your Wishlist",
//     });
//   }
// }

/************ View products details */
const ViewProductDetail = async (req, res) => {
  const id = req.params.id; // Extract id from req.params

  // const data = await PRODUCT.findOne({ _id: new mongoose.Types.ObjectId(id) });

  // if (!data) {
  //   return res.status(404).send({
  //     statuscode: 404,
  //     message: "Product not found",
  //   });
  // }

  // return res.send({
  //   statuscode: 200,
  //   message: "Your Product details!!!",
  //   data: data,
  // });

  const data = await PRODUCT.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "wishlists",
        localField: "_id",
        foreignField: "productId",
        as: "data",
      },
    },

    {
      $project: {
        name: 1,
        image: 1,
        description: 1,
        image: 1,
        brandId: 1,
        isStock: 1,
        quantity: 1,
        createBy: 1,
        isStock: 1,
        price: 1,
        Iswishlist: { $anyElementTrue: ["$data"] },
      },
    },
  ]);
  if (data) {
    return res.send({
      statuscode: 200,
      message: " products !!!",
      data: data,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "No products !!!",
    });
  }
};

const ChecOutProduct = async (req, res) => {
  const { productid } = req.body;

  const data = await PRODUCT.find({ _id: { $in: productid } });
  console.log(data, ">>>>>>>>>>>>>>>>>>>>>>>>>>>.");

  if (data.length > 0) {
    return res.status(200).send({
      statuscode: 200,
      message: "Your product !!!",
      data: data,
    });
  } else {
    return res.status(400).send({
      statuscode: 400,
      message: "not find !!!",
    });
  }
};

/****************** find acccout user  */

// const AcountFind = async (req, res) => {
//   const created = req.body;
//   const createdObjectId = mongoose.Types.ObjectId(created);
//   const data = await PRODUCT.aggregate([
//     {
//       $match: {
//         createBy: createdObjectId,
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         let: {
//           userid: "$created",
//         },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $and: {
//                   $eq: ["$$userid", "$_id"],
//                 },
//               },
//             },
//           },
//         ],
//         as: "accountId",
//       },
//     },
//     {
//       $project: {
//         accountId: 1,
//       },
//     },
//   ]);
//   return res.send({
//     statuscode: 200,
//     message: "your token",
//     data: data,
//   });
// };

const AcountFind = async (req, res) => {
  const { created } = req.body;
  console.log(
    created,
    ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );

  try {
    const createdObjectId = new mongoose.Types.ObjectId(created);

    const data = await PRODUCT.aggregate([
      {
        $match: {
          createBy: createdObjectId,
        },
      },
      {
        $lookup: {
          from: "users",
          let: {
            userid: "$createBy",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$userid", "$_id"],
                },
              },
            },
          ],
          as: "accountId",
        },
      },
      {
        $unwind: "$accountId", // Unwind the array of accounts
      },
      {
        $project: {
          _id: 0,
          accountId: "$accountId",
        },
      },
    ]);

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.", data);

    return res.send({
      statuscode: 200,
      message: "your token",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
};
module.exports = {
  AddProduct,
  Delete,
  Update,
  ViewAllProduct,
  ShowAllProduct,
  SearchProduct,
  ChecOutProduct,
  ViewProductDetail,
  AcountFind,
};
