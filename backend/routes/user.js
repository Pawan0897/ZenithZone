const express = require("express");
const router = express.Router();
const {
  userdel,
  userupdata,
  Uservarify,
  forgetpassword,
  userprofile,
  usersign,
  userprofile_update,
  userToken,
  uselogout,
  usedeleteaccount,
  NewPassword,
  UserLogoutVerify,
} = require("../Controller/user");
const { login } = require("../Controller/user");
const verifyToken = require("../Midleware/auth");
const multer = require("multer");




/**************** Post Signup  */
router.post("/register", usersign);

/********************* Get Login */
router.post("/login", login);

/************************ Delete User data*/
router.delete("/delete/:id", userdel);

/************************* Update User data*/
router.put("/update/:userid", userupdata);

/*************************  Forget  Password  OTP sent */
router.post("/forgetpassword", forgetpassword);

/**************************** OTP POST OTP verifiyed */
router.post("/otpvarify", Uservarify);

/*********************************  Profile Fetch with middle wire  */
router.get("/userprofile", verifyToken, userprofile);

/***********************************  profile Update */
// router.put("/profileupdate/:id", userprofile_update);

router.put("/profileupdate",verifyToken, userprofile_update);

/****************************  Token DEcode */
router.post("/token", userToken);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

// Single file
router.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  console.log(req.file); 
  return res.send("Single file");
});

/********************   Logout */
router.post("/logout", verifyToken, uselogout);

/********************** Delete Account */
router.post("/deleteaccount", verifyToken, usedeleteaccount);

/************************** New Password */
router.put("/newpassword",NewPassword);


/********* check user login or not */
router.post("/checkuser",verifyToken,UserLogoutVerify)

module.exports = router;
