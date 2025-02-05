import { https } from "./EndPoint";

export const userdetail = async () => {
  return await https.get("/userprofile");
};

/************************* add users */
export const addusers = async (body) => {
  return await https.post("/user/register", body);
};

/*************************** user get */
export const getuser = async () => {
  return await https.post("/user/register");
};

/****************************** login user */
export const loginuser = async (body) => {
  return await https.post("/user/login", body);
};

/****************************  otp verification */

export const optverify = async (body) => {
  return await https.post("/user/otpvarify", body);
};

/******************************* user logout */

export const userlogOut = async (token) => {
  return await https.post(
    "/user/logout",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

/***** forget password OTP sent VIA sms or MAIL */

export const UserOTP = async (body) => {
  return await https.post("/user/forgetpassword", body);
};

/************** add reason  */

export const Addreason = async (body) => {
  return await https.post("/admin/reason", body);
};

/************************ vie all product in Company  Dashboard*/
export const ViewProduct = async (toke) => {
  return await https.get("/product/allproduct", {
    headers: {
      Authorization: toke,
    },
  });
};

/************************** Add products  */
export const AddProducts = async (body) => {
  return await https.post("/product/addproduct", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/********************** Delete Product */
export const DeleteProduct = async (id) => {
  return await https.delete(`/product/delete/${id}`);
};

/******************************* UPDATE THE PRODUCTS with image */
export const UpdateProduct = async (id, data) => {
  return await https.put(`/product/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/*************************** in Admin View  All Users in Admin Dashboard */

export const ViewUsers = async () => {
  return await https.get("/admin/viewuser");
};

/**************************bShow all products form user in home page */
export const ShowProduct = async (token, body) => {
  return await https.get(`/product/products?name=${body}`, {
    headers: {
      Authorization: token,
    },
  });
};

/***************************** in Admin Click View user to See the User Details */

// export const ViewUserDetail = async(id) =>
// {
//   return await https.get(`/admin/viewdetail/${id}`);
// }

/**************************** add Wish list */

export const AddWishList = async (token, body) => {
  console.log("token", token, "And Item +>", body);

  return await https.post("/product/addwishlist", body, {
    headers: {
      Authorization: token,
    },
  });
};

/**************** Count With List */
export const CountWishList = async (token) => {
  return await https.get("/product/wishlistcount", {
    headers: {
      Authorization: token,
    },
  });
};

/******************* Show All Wishlist For User */
export const ShowWishList = async (token) => {
  return await https.get("/product/showwishlist", {
    headers: {
      Authorization: token,
    },
  });
};

/******************** Search products */
export const SearchProduct = async (body) => {
  return await https.get(`product/search?name=${body}`);
};

/********************* New Password */
export const NewPassword = async (body) => {
  return await https.put("/user/newpassword", body);
};
// export const ViewProduct = async(toke) => {
//   return await https.get("/product/allproduct",
//    {
//      headers: {
//        Authorization: toke,
//      },
//    });
//  }

/******************** Show category   */
export const ShowCategory = async () => {
  return await https.get("/category/showcategory");
};

/****************** Category Products  */

export const CategoryProduct = async (catid) => {
  return await https.get(`/category/categoryproducts/${catid}`);
};

/*************************Add To Cart */

export const AddToCart = async (body) => {
  console.log("body", body);
  return await https.post(
    `/cart/addtocart`,
    { productid: body?.productid },
    {
      headers: {
        Authorization: body?.token,
      },
    }
  );
};

/****************get all the product  */
export const FetchCart = async (token) => {
  return await https.get("/cart/getcart", {
    headers: {
      Authorization: token,
    },
  });
};

/******** coutn all cart products  */
export const cartProduct = async (token) => {
  return await https.get("/cart/countcartlist", {
    headers: {
      Authorization: token,
    },
  });
};
// export const ViewProduct = async (toke) => {
//   return await https.get("/product/allproduct", {
//     headers: {
//       Authorization: toke,
//     },
//   });
// };

/********************** Quantity updated  */
export const UpdateQuantity = async (body) => {
  console.log(body, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  return await https.put(
    "/cart/quantity",
    { productid: body?.productid, quantity: body?.quantity },
    {
      headers: {
        Authorization: body?.token,
      },
    }
  );
};

/***************** remove cart product  */
export const cartRemove = async (token, id) => {
  return await https.delete(`/cart/removecart/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

/**************** View One Products */

export const ViewProductdetail = async (id) => {
  return await https.get(`/product/productdetails/${id}`);
};

// ********************  Checkout products

export const CheckOutProduct = async (body) => {
  console.log(body, "============================================");

  return await https.post("/product/chekoutptoduct", body);
};

// ***********************  view user details

export const ViewCompanyUser = async (token) => {
  return await https.get("/user/userprofile", {
    headers: {
      Authorization: token,
    },
  });
};

/*************************  Account Link Create  */
export const AccountLink = async (token) => {
  return await https.post(
    "/payment/accountlink",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

/******************* Add Products Product */

export const AddUserBrand = async (body, token) => {
  return await https.post("/brand/addbrand", body, {
    headers: {
      Authorization: token,
    },
  });
};

/******************* Get Brands */
export const GetBrand = async (token) => {
  return await https.get("/brand/getbrands", {
    headers: {
      Authorization: token,
    },
  });
};

/******************** Account Retrieve KEy */
export const AccountIsDone = async (token) => {
  return await https.get(`/payment/paymentretrieve`, {
    headers: {
      Authorization: token,
    },
  });
};

/********************** Set Order  */
export const OrderSet = async (body, token) => {
  return await https.post("/order/setorder", body, {
    headers: { Authorization: token },
  });
};

/***************************** save address */

export const SaveAddress = async (body, token) => {
  return await https.post("/address/addaddress", body, {
    headers: { Authorization: token },
  });
};

/*********** ********** Set order with products */
export const OrderGen = async (body, token) => {
  return await https.post("/order/setorder", body, {
    headers: { Authorization: token },
  });
};

export const AddressFetched = async (token) => {
  return await https.get("/address/addressget", {
    headers: {
      Authorization: token,
    },
  });
};

/**************** Delete address */
export const AddressDe = async (id) => {
  return await https.delete(`/address/delete/${id}`);
};

/************** Update Address */
export const AddressUdate = async (id, body) => {
  return await https.put(`/address/update/${id}`, body);
};
/******************* Get Order  */
export const OrderFetch = async (token) => {
  return await https.get("/order/getorder", {
    headers: {
      Authorization: token,
    },
  });
};

export const companyOrder = async (toekn) => {
  return await https.get("/order/companyorder", {
    headers: {
      Authorization: toekn,
    },
  });
};
// ****************************** Show category
export const cateGory = async () => {
  return await https.get("/category/showcategory");
};

/******************** Add Category  */
export const AddCateGory = async (body, token) => {
  return await https.post("/category/addcategory", body, {
    headers: {
      Authorization: token,
    },
  });
};

/******************* Deleted Category  */
export const deleteCategory = async (id) => {
  return await https.delete(`/category/delete/${id}`);
};

/********************************* Admin Order LIst */
export const AdminOrder = async (token) => {
  return await https.get("/order/adminorder", {
    headers: {
      Authorization: token,
    },
  });
};
