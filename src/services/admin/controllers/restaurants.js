const restaurants = require("../../../models/restaurant");

const create = async (req, res, nex) => {
  const { config } = req.body;

  try {
    const created = await restaurants.create({
      name: config.name.trim(),
      email: config.email.trim(),
      password: config.password.trim(),
      image: config.image.trim(),
      city: config.city.trim(),
      geoPoint: {
        lat: Number(config.lat.trim()),
        long: Number(config.long.trim()),
      },
      topPicks: config.topPicks,
      popular: config.popular,
      isActive: true,
      offer: Number(config.offer.trim()),
      timing: {
        from: Number(config.timing.from.trim()),
        to: Number(config.timing.to.trim()),
      },
      rating: [],
    });

    res.json({
      message: "Added new restaurant successfully!",
      created: created,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateOne = async (req, res, nex) => {
  const { config } = req.body;

  try {
    const fetched = await restaurants.findById(config.id);

    fetched.name = config.name.trim() || fetched.name;
    fetched.email = config.email.trim() || fetched.email;
    fetched.password = config.password.trim() || fetched.password;
    fetched.image = config.image.trim() || fetched.image;
    fetched.city =
      config.city.trim() || fetched.city || fetched.restaurantAddress.city;
    fetched.geoPoint.lat = Number(config.lat) || fetched.geoPoint.lat;
    fetched.geoPoint.long = Number(config.long) || fetched.geoPoint.long;
    fetched.topPicks = config.topPicks || fetched.topPicks;
    fetched.popular = config.popular || fetched.popular;
    fetched.offer = config.offer || fetched.offer;
    fetched.timing.from = Number(config.timing.from) || fetched.timing.from;
    fetched.timing.to = Number(config.timing.to) || fetched.timing.to;

    const updated = await fetched.save();

    res.json({
      message: "Successfully updated restaurant",
      updated: updated,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteOne = async (req, res, nex) => {
  const { id } = req.query;
  try {
    await restaurants.deleteOne({ _id: id });

    res.json({
      statusCode: 200,
      message: "Successfully deleted the restaurant",
    });
  } catch (e) {
    console.log(e);
  }
};

const toggleAvailability = async (req, res, nex) => {
  const { id } = req.body;
  try {
    const fetched = await restaurants.findById(id);

    fetched.isActive = !fetched.isActive;

    const updated = await fetched.save();

    res.json({
      message: `Updated to ${updated.isActive}`,
      updated: updated.isActive,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  create: create,
  updateOne: updateOne,
  deleteOne: deleteOne,
  toggleAvailability: toggleAvailability,
};
