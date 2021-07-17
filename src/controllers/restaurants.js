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
      email: restaurantInfo.email.trim(),
      password: restaurantInfo.password.trim(),
      image: restaurantInfo.image.trim(),
      restaurantAddress: {
        landmark: "alo",
        address: "alo",
        city: restaurantInfo.city.trim(),
      },
      geoPoint: {
        lat: Number(restaurantInfo.lat.trim()),
        long: Number(restaurantInfo.long.trim()),
      },
      isActive: true,
      offer: Number(restaurantInfo.offer.trim()),
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
