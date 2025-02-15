const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decodeToken.userId;
    next();
  } catch (error) {
    res.status(403).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = authMiddleWare;
