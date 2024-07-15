const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "shiu");

    return next();
  } catch (err) {
    return res.status(401).json({
      error: "User not authenticated",
      statusCode: 401,
    });
  }
};

module.exports = verifyToken;
