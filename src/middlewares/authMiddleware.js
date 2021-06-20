const jwt = require("jsonwebtoken");
const users = require("../models/user");

const authMiddleware = (req, res, nex) => {
  const token = req.headers.authorization;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.userId;
  nex();
};

module.exports = authMiddleware;
