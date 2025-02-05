
const express = require("express");
const router = express.Router();
const {addreason, addadmin, login, ViewUser, ViewUserDetail} = require("../Controller/admin");


/************************** add admin */
router.post("/register",addadmin);


/***************************** reasons */
router.post("/reason",addreason);

/*************************** admin login */
router.post("/login",login);


/***********************  view All User */
router.get("/viewuser",ViewUser)

/***************** view User Detiails */
router.get("/viewdetail/:id",ViewUserDetail)

/************************* Add Category */

// router.post("/addcategory",verifyToken,addCategory)


module.exports = router;
