const foods = require("../models/food");

const getAllFoodItems = async (req, res, nex) => {
  try {
    const allFoods = await foods.find();

    res.set("Access-Control-Allow-Origin", "*");

    res.json({
      message: "Fetched all foods",
      allFoods: allFoods.sort(() => Math.random() - 0.5),
    });
  } catch (e) {
    console.log(e);
  }
};

const addNewFoodItem = async (req, res, nex) => {
  const { foodInfo } = req.body;

  console.log();

  try {
    const newFood = await foods.create({
      name: foodInfo.name.trim(),
      image: foodInfo.image.trim(),
      description: foodInfo.description.trim(),
      category: foodInfo.category.trim(),
      fixedPrice: foodInfo.fixedPrice.trim(),
      offerPrice: foodInfo.offerPrice.trim(),
      availabilityTiming: {
        from: foodInfo.availabilityTiming.from.trim(),
        to: foodInfo.availabilityTiming.to.trim(),
      },
      isActive: true,
      rating: 4.1,
      restaurantId: foodInfo.restaurantId.trim(),
    });

    res.json({
      message: "Added new food successfully!",
      newFood: newFood,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateFoodItem = async (req, res, nex) => {
  try {
    const updatedFood = await foods;
  } catch (e) {
    console.log(e);
  }
};

const deleteFoodItem = async (req, res, nex) => {
  try {
    const deletedFood = await foods;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllFoodItems: getAllFoodItems,
  addNewFoodItem: addNewFoodItem,
  updateFoodItem: updateFoodItem,
  deleteFoodItem: deleteFoodItem,
};
