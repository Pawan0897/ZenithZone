const { USER } = require("../Modal/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(
  "**************************************************"
);
const { sentSMS, sendRegisterSMS } = require("../CommonFunction/SendSMS");
const { sentMail, sendRegisterMail } = require("../CommonFunction/SendMail");
/*********************** OTP generator------- */
const Status = require("../CommonFunction/Status");
/************************LOgin TOken USer verfiy if not logout */
const UserLogoutVerify = async (req, res) => {
  const userId = req.userId;
  const data = await USER.findById({ _id: userId });
  console.log(data, ":::::::::::::::::::::::::::::::::::::::::::::::::::");

  if (data) {
    return res.send({
      statuscode: 200,
      message: "user Login!!",
      data: data,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "not Login !!",
    });
  }
};
/****************************  USER Register POST */
const usersign = async (req, res) => {
  const { firstname, lastname, email, password, role, phone, otp } = req.body;
  const Email = email.toLowerCase();

  const Uservrifi = await USER.findOne({ email: Email });
  const phoneverifi = await USER.findOne({ phone: phone });
  /********* email checked is valid !!!!!! */
  if (Uservrifi) {
    return res.send({
      statuscode: 400,
      message: "This email already exists!",
    });
  } else if (phoneverifi) {
    /************ phone checked is valid !!!!!! */
    return res.send({
      statuscode: 400,
      message: "this phone number already exists!",
    });
  } else {
    /*****Change password into bycrypt   */
    /********************** stripe Api */
    const hpassword = bcrypt.hashSync(password, 10);

    const userdata = new USER({
      firstname,
      lastname,
      email: Email,
      role,
      phone,
      password: hpassword,
    });

    /*************** Stripe create customer ID */

    if (req.body.role == "user") {
      const customer = await stripe.customers.create({
        name: firstname + lastname,
        email: email,
      });
      userdata.customerid = customer?.id;
    }

    // ************************* Stripe Create Company Account
    else if (req.body.role == "company") {
      const account = await stripe.accounts.create({
        country: "US",
        email: email,
        controller: {
          fees: {
            payer: "application",
          },
          losses: {
            payments: "application",
          },
          stripe_dashboard: {
            type: "express",
          },
        },
        requested_capabilities: ["card_payments", "transfers"],
      });
      userdata.accountId = account?.id;
    }

    /*********************** send OTP through MAIL */
    const data = await userdata.save();
    // sendRegisterSMS(userdata?.phone);
    sendRegisterMail(userdata?.email);
    return res.send({
      statuscode: 200,
      message: "Please varify OTP  !!!",
      data: data,
    });

    /******************* response */
  }
};

/**** Login   GET*/
const login = async (req, res) => {
  const { email, password } = req.body;
  const data = await USER.findOne({ email });
  // User.findByIdAndUpdate( userId, { email: newEmail }, { new: true})
  /*** Password Varification */
  /**** Email Verification */
  if (!data) {
    return res.send({
      statuscode: 404,
      message: "Email is not valid !!!!!!!!!!",
    });
  } else if (!bcrypt.compareSync(password, data?.password)) {
    /**** Password  Verify */
    console.log("hiiiiiiiiiiii");
    return res.send({
      statuscode: 400,
      message: "Password is not match !!!!!!!!!!",
    });
  } else if (data?.status == "deleted") {
    return res.send({
      statuscode: 404,
      message: "This account will be deleted  !!!!!!!!!!",
    });
  } else if (!data?.isValid) {
    return res.send({
      statuscode: 401,
      message: " Please Verify first !!!",
    });
  } else {
    /******* Authintication Token */
    const user_token = jwt.sign({ userId: data?._id }, "teyeryytery");
    // await USER.updateOne(
    //   { _id: data?._id },
    //   { $set: {status:"active" } },
    //   { new: true }
    // );
    data.status = "active";
    data.token = user_token;
    await data.save();
    /*****  Send Response */
    return res.send({
      statuscode: 200,
      message: "Login Successfully !!!!!!!!!!!!!",
      data: data,
    });
  }
};

/***** Delete User*/
const userdel = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = await USER.findByIdAndDelete({ _id: id });
  console.log(data);
  /********* */
  if (data) {
    return res.send({
      statuscode: 200,
      message: "succesfully deleted !!!",
      data: data,
    });
  } else {
    /********* */
    res.send({
      statuscode: 404,
      message: "Not Found !!!",
      data: data,
    });
  }
};

/***** Update  USer Info*/

const userupdata = async (req, res) => {
  const { userid } = req.params;
  console.log(userid);
  const { firstname } = req.body;
  const userdata = await USER.updateOne(
    { _id: userid },
    { $set: { firstname: firstname } }
  );
  /*********Send Response */
  if (userdata) {
    res.send({
      statuscode: 200,
      message: "okokokokokokoko",
      data: userdata,
    });
  } else {
    /*********User is not exist */
    res.send({
      statuscode: 200,
      message: "not found",
      data: userdata,
    });
  }
};

/*****User Forget Password */
const forgetpassword = async (req, res) => {
  const { email } = req.body;
  const { phone } = req.body;

  /*************** email */
  if (email) {
    sentMail(email, res);
  } else if (phone) {
    /*************** phone */
    sentSMS(phone, res);
  }
};

/***** USER OTP VARIFY for change password */
const Uservarify = async (req, res) => {
  const { otp } = req.body;
  // const phonenumber = req.body;

  const uservarify = await USER.findOne({ otp });
  console.log(uservarify);
  if (uservarify) {
    await USER.updateOne(
      { email: uservarify?.email },
      { $set: { otp: otp, isValid: true } },
      { new: true }
    );

    return res.send({
      statuscode: 200,
      message: "OTP Verified !!!!!!",
      data: uservarify,
    });
  } else {
    return res.send({
      statuscode: 404,
      message: "Wrong OTP !!!!!!",
    });
  }
};

/***** profile fetch */
const userprofile = async (req, res) => {
  const userId = req.userId;
  console.log(userId, "kppppp--------------------------ppppppppppppppp");

  const userprofile = await USER.findOne({ _id: userId });
  if (userprofile) {
    return res.send({
      statuscode: 200,
      message: "Successfully !!!!!!",
      data: userprofile,
    });
  } else {
    return res.send({
      statuscode: 404,
      message: "These User is not Exist !!!!!!",
    });
  }
};

/*****profile Update */
const userprofile_update = async (req, res) => {
  // const { id } = req.params;
  const userId = req.userId;
  console.log(userId, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");

  const { firstname, email } = req.body;
  const userdata = await USER.findOne({ email });

  if (userdata) {
    console.log(
      "................. enail is already exist ........................"
    );
    return res.send({
      statuscode: 400,
      message: "Email is already exist !!!!",
    });
  } else {
    const data = await USER.updateMany(
      { _id: userId },
      { $set: { firstname: firstname, email: email } }
    );
    console.log(data, ".........................................");

    return res.send({
      statuscode: 200,
      message: "okokkok!!!!!!",
      data: data,
    });
  }
};

/********** Token Decode */
const userToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(400)
      .send({ statuscode: 400, message: "Token is required" });
  }
  const verify = jwt.verify(token, "teyeryytery");
  console.log(verify.userId, ">>>>>>>>>>>>>>>>>>");
  console.log(verify, ">>>>>>>>>>>>>>>>>>");
  const verify2 = await USER.findOne({ _id: verify?.userId });
  console.log(verify2);

  if (verify2) {
    return res.send({
      statuscode: 200,
      message: "ok",
      data: verify,
    });
  } else {
    res.send({
      message: "not found",
      data: verify,
    });
  }
};

/************* Userprofile update*/
// const userprofile_upload = async (req, res) => {

//   const image = req.body;

// };
/********************************************* */

/******************************* logout */
const uselogout = async (req, res) => {
  const userId = req.userId;
  const logout = await USER.findOne({ _id: userId });
  if (logout) {
    const data = await USER.updateOne(
      { _id: logout._id },
      { $set: { token: "", status: "inactive" } },
      { new: true }
    );
    return res.send({
      statuscode: 200,
      message: "Logout Successsfully !!",
      data: data,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "Something wrong!!",
    });
  }
};

/*******************************************  Delete Account  */

const usedeleteaccount = async (req, res) => {
  const userId = req.userId;
  const { reason } = req.body;
  if (!reason) {
    return res.send({
      statuscode: 400,
      message: `please add Reason !!!!!`,
    });
  } else if (!userId) {
    return res.send({
      statuscode: 400,
      message: `Token is not valid !!!!`,
    });
  } else {
    const delaccount = await USER.updateOne(
      { _id: userId },
      { $set: { status: "Deleted", reason: reason } },
      { new: true }
    );
    return res.send({
      statuscode: 200,
      message: `Your Account will be deleted !!!!`,
      data: delaccount,
    });
    // await USER.updateOne({_id:userId} , {$set:{reason:reason}})
  }
};

/***************************** New Password */
const NewPassword = async (req, res) => {
  const { password, email } = req.body;
  const data = await USER.findOne({ email: email });
  console.log(data, "????????????????????????????????????????????/");

  if (data) {
    const hpass = bcrypt.hashSync(password, 10);
    // const change = new USER({
    //   password: hpass,
    // });
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    await USER.updateOne(
      { _id: data._id },
      { $set: { password: hpass } },
      { new: true }
    );
    return res.send({
      statuscode: 200,
      message: "password change successfully",
      data: data,
    });
  }
};

/*************************************************** */
module.exports = {
  usersign,
  login,
  userdel,
  userupdata,
  forgetpassword,
  Uservarify,
  userprofile,
  userprofile_update,
  userToken,
  uselogout,
  NewPassword,
  usedeleteaccount,
  UserLogoutVerify,
};
