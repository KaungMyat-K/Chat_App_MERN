const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(" thiis token >> ", token);
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(" thiis decode >> ", decodeToken);
    req.body.userId = decodeToken.userId;
    console.log(" thiis userID >> ", req.body.userId);
    next();
  } catch (error) {
    res.status(403).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = authMiddleWare;
