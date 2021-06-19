const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const App = express();
dotenv.config();

App.use(helmet());
App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

const rootRoutes = require("./routes/rootRoutes");

App.use(rootRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.mongoString, {
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
