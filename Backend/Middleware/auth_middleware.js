const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      next();
    } else {
      return res.json({ msg: "Token Is Not Verified Please Login Again" });
    }
  } else {
    return res.json({ msg: "Token Is Not Verified Please Login Again" });
  }
};

module.exports = { authMiddleware };
