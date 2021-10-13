const express = require("express");

const restaurant = require("./controllers/restaurants");
const food = require("./controllers/foods");
const product = require("./controllers/products");
const order = require("./controllers/orders");

const router = express.Router();

router.post("/images");
router.delete("/images");

router.post("/restaurant", restaurant.create);
router.post("/restaurant/update", restaurant.updateOne);
router.delete("/restaurant", restaurant.deleteOne);
router.post("/restaurant/toggle", restaurant.toggleAvailability);

router.post("/food", food.create);
router.post("/food/update", food.updateOne);
router.delete("/food", food.deleteOne);
router.post("/food/toggle", food.toggleAvailability);

router.post("/product", product.create);
router.post("/product/update", product.updateOne);
router.delete("/product", product.deleteOne);

router.get("/orders", order.get);
router.post("/orders/update", order.update);

module.exports = router;
