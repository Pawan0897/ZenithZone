
const otp = require("otp-generator");
const otpGenerator = () => {
 return  otp.generate(5, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits:true
      });
}
module.exports = {otpGenerator};