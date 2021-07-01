const express = require("express");

const {
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurants");

const {
  addNewFoodItem,
  updateFoodItem,
  deleteFoodItem,
} = require("../controllers/foods");

const {
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const { allOrders, updateOrder } = require("../controllers/orders");

const router = express.Router();

router.post("/addRestaurant", addRestaurant);

router.post("/updateRestaurant", updateRestaurant);

router.delete("/deleteRestaurant", deleteRestaurant);

router.post("/addNewFoodItem", addNewFoodItem);

router.post("/updateFoodItem", updateFoodItem);

router.delete("/deleteFoodItem", deleteFoodItem);

router.post("/addNewProduct", addNewProduct);

router.post("/updateProduct", updateProduct);

router.delete("/deleteProduct", deleteProduct);

router.get("/allOrders", allOrders);

router.post("/updateOrder", updateOrder);

module.exports = router;
