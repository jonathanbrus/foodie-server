const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("server is running");
});

const commonRoutes = require("./services/common/router");

router.use(commonRoutes);

const userRoutes = require("./services/users/router");

router.use("/user", userRoutes);

const adminRoutes = require("./services/admin/router");

router.use("/admin", adminRoutes);

module.exports = router;
