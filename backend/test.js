var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kumarpawan9041491@gmail.com",
    pass: "pdml fhsb cqwp ooer",
  },
});

var mailOptions = {
  from: "kumarpawan9041491@gmail.com",
  to: "kumarpawan9041491@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
