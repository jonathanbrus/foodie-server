const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const App = express();
dotenv.config();

App.use(cors());

App.use(helmet());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

const Router = require("./router");

App.use(Router);

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_STRING, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
App.listen(
  PORT,
  "0.0.0.0" || "localhost",
  console.log(`server running on port ${PORT}`)
);
// })
// .catch((err) => {
//   console.log(err);
// });
