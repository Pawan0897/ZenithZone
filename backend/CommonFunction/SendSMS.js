const { USER } = require("../Modal/user");
const { otpGenerator } = require("./otpgenerator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*********************** OTP generator------- */

/****************************** send OTP SMS from forget password */
const sentSMS = async (req, res) => {
  const userdata = await USER.findOne({ phone: req });
  const OTP = otpGenerator();
  if (userdata) {
    const message = `Your Verification code is ${OTP}`;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    client.messages
      .create({
        body: message,
        from: "+12186569157",
        to: req,
      })
      .then((message) => console.log(message.sid));

    console.log(OTP);
    const otpdata = await USER.updateOne(
      { phone: req },
      { $set: { otp: OTP } },
      {new:true}
    );
    console.log(otpdata);
    return res.send({
      statuscode: 200,
      message: " You OTP is ",
      data: userdata,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "This number is no valid !!!!!",
    });
  }
};

/************************ Register data send otp from phonr  */
const sendRegisterSMS = async(phone) => {
  const OTP = otpGenerator();
  const message = `Your Verification code is ${OTP}`;
  const accountSid = "AC46f28b7579f6bd6932adca5efa177d68";
  const authToken = "247afd9b62b32653a9d23244d914a18c";
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: message,
      from: "+12186569157",
      to: phone,
    })
    .then((message) => console.log(message.sid));

  console.log(OTP);
  await USER.updateOne(
    { phone: phone },
    { $set: { otp: OTP } },
    {new:true}
  );;
}

module.exports = { sentSMS,sendRegisterSMS };
