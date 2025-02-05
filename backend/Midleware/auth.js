const { USER } = require("../Modal/user");
const jwt = require("jsonwebtoken");

// const verifyToken = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     return res.status(401).send('Access denied. No token provided.');
//   }
//   const token = authHeader.split(' ')[1];
//   if (!token) {
//     return res.status(401).send('Access denied. No token provided.');
//   }

//   try {

//     const decoded = jwt.verify(token, "teyeryytery");
//     const user = await USER.findOne({ _id: decoded.userId });
//     if (user) {
//       req.user = user;
//       req.userId = user._id;
//       next();
//     } else {
//       return res.status(401).send('Token is not valid');
//     }
//   } catch (error) {
//     console.log(error, 'dddddddddddddd');
//     return res.status(400).send('Invalid token');
//   }
// };

/**************  verify toekn  */
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.send({
      status: 400,
      message: "Token is required !!!",
    });
  }
  try {
    /*** token varify  */
    const verify_token = jwt.verify(token, "teyeryytery");
    req.userId = verify_token.userId;
    const user = await USER.findOne({ _id: req.userId });
    req.user = user;
    console.log(user?.accountId, "777777777777777777777777777777777777777777");

    next();
  } catch (error) {
    return res.status(404).send("invalid token");
  }
};
module.exports = verifyToken;
