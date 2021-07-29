const foods = require("../models/food");

const getFoodItemsByResId = async (req, res, nex) => {
  const { resId } = req.query;

  try {
    const allFoods = await foods.find({ restaurantId: resId });

    res.json({
      message: "Fetched all foods",
      allFoods: allFoods,
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
  const { foodInfo } = req.body;

  try {
    const fetchedFood = await foods.findById(foodInfo.id);
    fetchedFood.name = foodInfo.name.trim() || fetchedFood.name;
    fetchedFood.image = foodInfo.image.trim() || fetchedFood.image;
    fetchedFood.description =
      foodInfo.description.trim() || fetchedFood.description;
    fetchedFood.category = foodInfo.category.trim() || fetchedFood.category;
    fetchedFood.fixedPrice = foodInfo.fixedPrice || fetchedFood.fixedPrice;
    fetchedFood.offerPrice = foodInfo.offerPrice || fetchedFood.offerPrice;
    fetchedFood.packagingCharge =
      foodInfo.packagingCharge || fetchedFood.packagingCharge;
    fetchedFood.availabilityTiming.from =
      foodInfo.availabilityTiming.from || fetchedFood.availabilityTiming.from;
    fetchedFood.availabilityTiming.to =
      foodInfo.availabilityTiming.to || fetchedFood.availabilityTiming.to;

    const updatedFood = await fetchedFood.save();

    res.json({
      message: "Updated food successfully",
      updatedFood: updatedFood,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteFoodItem = async (req, res, nex) => {
  const { foodId } = req.query;
  try {
    await foods.deleteOne({ _id: foodId });

    res.json({
      message: "Successfully deleted food",
    });
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
