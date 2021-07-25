const foods = require("../models/food");

const getFoodItemsByResId = async (req, res, nex) => {
  const { resId } = req.query;

  try {
    const allFoods = await foods.find({ restaurantId: resId });

    res.json({
      message: "Fetched all foods",
      allFoods: allFoods.reverse(),
    });
  } catch (e) {
    console.log(e);
  }
};

const addNewFoodItem = async (req, res, nex) => {
  const { foodInfo } = req.body;

  try {
    const newFood = await foods.create({
      name: foodInfo.name.trim(),
      image: foodInfo.image.trim(),
      description: foodInfo.description.trim(),
      category: foodInfo.category.trim(),
      fixedPrice: foodInfo.fixedPrice.trim(),
      offerPrice: foodInfo.offerPrice.trim(),
      packagingCharge: foodInfo.packagingCharge.trim(),
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
  getFoodItemsByResId: getFoodItemsByResId,
  addNewFoodItem: addNewFoodItem,
  updateFoodItem: updateFoodItem,
  deleteFoodItem: deleteFoodItem,
};
