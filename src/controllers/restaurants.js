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

const updateRestaurant = async (req, res, nex) => {
  const { restaurantInfo } = req.body;

  try {
    const fetchedRestaurant = await restaurants.findById(restaurantInfo.id);

    (fetchedRestaurant.name =
      restaurantInfo.name.trim() || fetchedRestaurant.name),
      (fetchedRestaurant.email =
        restaurantInfo.email.trim() || fetchedRestaurant.email),
      (fetchedRestaurant.password =
        restaurantInfo.password.trim() || fetchedRestaurant.password),
      (fetchedRestaurant.image =
        restaurantInfo.image.trim() || fetchedRestaurant.image),
      (fetchedRestaurant.restaurantAddress.city =
        restaurantInfo.city.trim() || fetchedRestaurant.restaurantAddress.city);
    fetchedRestaurant.geoPoint.lat =
      Number(restaurantInfo.lat) || fetchedRestaurant.geoPoint.lat;
    fetchedRestaurant.geoPoint.long =
      Number(restaurantInfo.long) || fetchedRestaurant.geoPoint.long;
    fetchedRestaurant.offer = restaurantInfo.offer || fetchedRestaurant.offer;
    fetchedRestaurant.timing.from =
      Number(restaurantInfo.timing.from) || fetchedRestaurant.timing.from;
    fetchedRestaurant.timing.to =
      Number(restaurantInfo.timing.to) || fetchedRestaurant.timing.to;

    const updatedRestaurant = await fetchedRestaurant.save();

    res.json({
      message: "Successfully updated restaurant",
      updatedRestaurant: updatedRestaurant,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteRestaurant = async (req, res, nex) => {};

const toggleActiveRestaurant = async (req, res, nex) => {
  const { resId } = req.body;
  try {
    const fetchedRestaurant = await restaurants.findById(resId);

    fetchedRestaurant.isActive = !fetchedRestaurant.isActive;

    const udpdated = await fetchedRestaurant.save();

    res.json({
      message: `Updated to ${udpdated.isActive}`,
      udpdated: udpdated.isActive,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllRestaurants: getAllRestaurants,
  addRestaurant: addRestaurant,
  updateRestaurant: updateRestaurant,
  toggleActiveRestaurant: toggleActiveRestaurant,
  deleteRestaurant: deleteRestaurant,
};
