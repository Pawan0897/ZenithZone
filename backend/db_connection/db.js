const mongoose = require("mongoose");
const  db_connection = async() => {
   await mongoose.connect("mongodb://127.0.0.1:27017/meshooo").then(() => {
        console.log("successfully connected!");
      }).catch(err => {
        console.error('Connection error', err);
      });
}
module.exports = {db_connection}