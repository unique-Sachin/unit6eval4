const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "linkedin", async (err, decoded) => {
      if (decoded) {
        req.body.user = decoded.userId;
        next();
      } else {
        res.send({ msg: "Please login first", err });
      }
    });
  } else {
    res.send({ msg: "Please login first" });
  }
};

module.exports = {
  authenticate,
};
