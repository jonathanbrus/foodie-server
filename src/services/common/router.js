const express = require("express");

const restaurants = require("./controllers/restaurants");

const foods = require("./controllers/foods");

const products = require("./controllers/products");

const images = require("./controllers/images");

const router = express.Router();

router.get("/restaurants", restaurants.get);

router.get("/foods", foods.get);

router.get("/products", products.get);

router.get("/images", images.get);

module.exports = router;
