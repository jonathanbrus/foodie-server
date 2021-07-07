const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const App = express();
dotenv.config();

App.use(helmet());

// App.use("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cors({ origin: "*" }));

const rootRoutes = require("./routes/rootRoutes");

App.use(rootRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    App.listen(PORT, console.log(`server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
