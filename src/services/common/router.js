const express = require("express");

const allRestaurants = require("./controllers/restaurants");

const allFoodsByRes = require("./controllers/foods");

const allProductsByCategory = require("./controllers/products");

const getImages = require("./controllers/images");

const router = express.Router();

router.get("/allRestaurants", allRestaurants);

router.get("/allFoodsByRes", allFoodsByRes);

router.get("/allProductsByCategory", allProductsByCategory);

router.get("/fetchImages/:imageFor", getImages);

module.exports = router;
