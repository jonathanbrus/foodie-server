const restaurants = require("../models/restaurant");

const getAllRestaurants = async (req, res, nex) => {
  try {
    const allRestaurants = await restaurants.find();

    res.json({
      message: "Fetched all restaurants",
      allRestaurants: allRestaurants.sort(() => Math.random() - 0.5),
    });
  } catch (e) {
    console.log(e);
  }
};

const addRestaurant = async (req, res, nex) => {
  const { restaurantInfo } = req.body;

  try {
    const newRestaurant = await restaurants.create({
      name: restaurantInfo.name.trim(),
      image: restaurantInfo.image.trim(),
      email: restaurantInfo.email.trim(),
      password: restaurantInfo.password.trim(),
      restaurantAddress: {
        landmark: restaurantInfo.restaurantAddress.landmark.trim(),
        address: restaurantInfo.restaurantAddress.address.trim(),
        city: restaurantInfo.restaurantAddress.city.trim(),
      },
      isActive: true,
      timing: {
        from: Number(restaurantInfo.timing.from.trim()),
        to: Number(restaurantInfo.timing.to.trim()),
      },
      rating: 4.1,
    });

    res.json({
      message: "Added new restaurant successfully!",
      newRestaurant: newRestaurant,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateRestaurant = async (req, res, nex) => {};

const deleteRestaurant = async (req, res, nex) => {};

module.exports = {
  getAllRestaurants: getAllRestaurants,
  addRestaurant: addRestaurant,
  updateRestaurant: updateRestaurant,
  deleteRestaurant: deleteRestaurant,
};
