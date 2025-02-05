const { default: mongoose } = require("mongoose");
const { ADDRESS } = require("../Modal/adress");
const { DISCOUNT } = require("../Modal/Discount");
var cron = require('node-cron');
const AddDiscount = async (req, res) => {
//   const userid = req.userid;
  const { startDate, expire, coupenId, isActive, percent } = req.body;
  const data = new DISCOUNT({
    startDate:startDate,
    expire:expire,
    coupenId:coupenId,
    isActive:isActive,
    percent:percent,
  });
  const r = cron.schedule('1 * * * *', () => {
    console.log('running a task every minute');
  });
  return res.send({
    data:r,
    message:"kpkpkpkpk"
  })
};
 module.exports = {AddDiscount}