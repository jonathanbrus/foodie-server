const jwt = require("jsonwebtoken");

module.exports = generateToken = (userId, email) =>
  jwt.sign({ userId: userId, email: email }, `${process.env.JWT_SECRET}`, {
    expiresIn: "7d",
  });
