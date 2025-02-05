const { USER } = require("../Modal/user");
const nodemailer = require("nodemailer");
const { otpGenerator } = require("./otpgenerator");
/******************** sent mail code usoing forget password !!!!! */
const subject = "Your Varification code is ";
const text = "Please fill you otp !!!!!";

const sentMail = async (req, res) => {
  const email = req;
  const userdata = await USER.findOne({ email: email });
  const OTP = otpGenerator();
  try {
    if (!userdata) {
      return res.send({
        statuscode: 400,
        message: "this email is not valid !!!!",
      });
    } else {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kumarpawan9041491@gmail.com",
          pass: "pdml fhsb cqwp ooer",
        },
      });

      var mailOptions = {
        from: userdata?.email,
        to: userdata?.email,
        subject: subject + ` ${OTP}`,
        text: text,
      };

      await USER.updateOne(
        { email: email },
        { $set: { otp: OTP } },
        { new: true }
      );

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return res.send({
        statuscode: 200,
        message: "OTP Send Successfully !!!!!!",
        data: userdata,
      });
    }
  } catch (error) {
    return res.send({
      statuscode: 400,
      message: "Network errorr !!!!",
    });
  }
};

/****************************** sent register mail  */

const sendRegisterMail = async (email) => {
  const OTP = otpGenerator();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kumarpawan9041491@gmail.com",
      pass: "pdml fhsb cqwp ooer",
    },
  });

  var mailOptions = {
    from: "kumarpawan9041491@gmail.com",
    to: email,
    subject: "ok" + ` ${OTP}`,
    text: "pk",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  await USER.updateOne({ email: email }, { $set: { otp: OTP } }, { new: true });
};
module.exports = { sentMail, sendRegisterMail };
