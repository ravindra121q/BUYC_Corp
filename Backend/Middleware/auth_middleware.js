const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token is not provided" });
  }

  try {
    const decoded = jwt.verify(token, `${process.env.secretKey}`);
    if (decoded) {
      next();
    } else {
      return res
        .status(401)
        .json({ msg: "Token is not verified. Please login again" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { authMiddleware };
