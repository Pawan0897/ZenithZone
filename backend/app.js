let createError = require("http-errors");
let express = require("express");
const mongoose = require("mongoose");
mongoose.set("debug", true);
const cors = require("cors");
/******************************************* */
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

/************************** Imports */
// let indexRouter = require("./routes/index");
let user_register = require("./routes/user");
const admin_route = require("./routes/admin");
const Product = require("./routes/products"); 
const category = require("./routes/category");
const cart = require("./routes/cart");
const order = require("./routes/order");
const address = require("./routes/address");
const discount = require("./routes/discount");
const payment = require("./routes/payment");
const { db_connection } = require("./db_connection/db");
const brand = require("./routes/brand");

require('dotenv').config()
console.log("fdfdsafsa",process.env.Secret_key);

/*************************** server */
let app = express();

/********************** database coonection */
db_connection();
const PORT = 3000;

/********************** view engine setup */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
/**************** folder directory pathhh for uploads ......... */
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

/************************************  Routes  */
// app.use("/", indexRouter);
app.use(cors());
app.use("/user", user_register);
app.use("/admin", admin_route);
app.use("/product", Product);
app.use("/category", category);
app.use("/cart", cart);
app.use("/order", order);
app.use("/address", address);
app.use("/discount", discount);
app.use("/payment", payment);
app.use("/brand", brand);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
/*********************************** create port */
app.listen(PORT, () => {
  console.log(`port is running on port ${PORT}`);
});

module.exports = app;
