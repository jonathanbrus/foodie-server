const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const App = express();
dotenv.config();

App.use(helmet());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://alo-foodie-dashboard.netlify.app"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

App.use(
  cors({
    origin: "https://alo-foodie-dashboard.netlify.app",
  })
);
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

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
