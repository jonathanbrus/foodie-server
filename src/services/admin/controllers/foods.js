const food = require("../../../models/food");

const addNewFoodItem = async (req, res, nex) => {
  const { foodConfig } = req.body;

  try {
    const addedFood = await food.create({
      name: foodConfig.name.trim(),
      image: foodConfig.image.trim(),
      description: foodConfig.description.trim(),
      category: foodConfig.category.trim(),
      fixedPrice: foodConfig.fixedPrice.trim(),
      offerPrice: foodConfig.offerPrice.trim(),
      packagingCharge: foodConfig.packagingCharge.trim(),
      availability: {
        from: foodConfig.availabilityTiming.from.trim(),
        to: foodConfig.availabilityTiming.to.trim(),
      },
      isActive: true,
      rating: 4.1,
      restaurantId: foodConfig.restaurantId.trim(),
    });

    res.json({
      statusCode: 200,
      message: "Successfully deleted the food",
      addedFood: addedFood,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateFoodItem = async (req, res, nex) => {
  const { foodConfig } = req.body;

  try {
    const fetchedFood = await food.findById(foodConfig.id);

    fetchedFood.name = foodConfig.name.trim() || fetchedFood.name;
    fetchedFood.image = foodConfig.image.trim() || fetchedFood.image;
    fetchedFood.description =
      foodConfig.description.trim() || fetchedFood.description;
    fetchedFood.category = foodConfig.category.trim() || fetchedFood.category;
    fetchedFood.fixedPrice = foodConfig.fixedPrice || fetchedFood.fixedPrice;
    fetchedFood.offerPrice = foodConfig.offerPrice || fetchedFood.offerPrice;
    fetchedFood.packagingCharge =
      foodConfig.packagingCharge || fetchedFood.packagingCharge;
    fetchedFood.availability.from =
      foodConfig.availability.from || fetchedFood.availability.from;
    fetchedFood.availability.to =
      foodConfig.availability.to || fetchedFood.availability.to;

    const updatedFood = await fetchedFood.save();

    res.json({
      statusCode: 200,
      message: "Successfully deleted the food",
      updatedFood: updatedFood,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteFoodItem = async (req, res, nex) => {
  const { foodId } = req.query;
  try {
    await food.deleteOne({ _id: foodId });

    res.json({ statusCode: 200, message: "Successfully deleted the food" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  addNewFoodItem: addNewFoodItem,
  updateFoodItem: updateFoodItem,
  deleteFoodItem: deleteFoodItem,
};
