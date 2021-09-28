const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, nex) => {
  const token = req.headers.authorization;

  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  req.userId = decoded.userId;
  nex();
};

module.exports = authMiddleware;
