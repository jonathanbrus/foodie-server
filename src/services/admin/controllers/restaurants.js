const restaurants = require("../../../models/restaurant");
const foods = require("../../../models/food");

const response = require("../../../utils/response");

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
      offer: Number(config.offer.trim()),
      timing: {
        from: Number(config.from.trim()),
        to: Number(config.to.trim()),
      },
    });

    res.json(response(200, "Created new restaurant successfully!", created));
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
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
    fetched.city = config.city.trim() || fetched.city;
    fetched.geoPoint.lat = Number(config.lat.trim()) || fetched.geoPoint.lat;
    fetched.geoPoint.long = Number(config.long.trim()) || fetched.geoPoint.long;
    fetched.topPicks = config.topPicks || fetched.topPicks;
    fetched.popular = config.popular || fetched.popular;
    fetched.offer = Number(config.offer.trim()) || fetched.offer;
    fetched.timing.from = Number(config.from.trim()) || fetched.timing.from;
    fetched.timing.to = Number(config.to.trim()) || fetched.timing.to;

    const updated = await fetched.save();

    res.json(response(200, "Updated the restaurant successfully!", updated));
  } catch (e) {
    console.log(e);
    res.json(response(500, "Something went wrong, try again later"));
  }
};

const deleteOne = async (req, res, nex) => {
  const { id } = req.query;
  try {
    await restaurants.deleteOne({ _id: id });
    await foods.deleteMany({ restaurantId: id });

    res.json(response(200, "Deleted the restaurant successfully!"));
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

const toggleAvailability = async (req, res, nex) => {
  const { id } = req.body;
  try {
    const fetched = await restaurants.findById(id);

    fetched.active = !fetched.active;

    const updated = await fetched.save();

    res.json(
      response(200, `Updated to ${updated.active}`, `${updated.active}`)
    );
  } catch (e) {
    console.log(e);
    res.json(response(500, "Something went wrong, try again later"));
  }
};

module.exports = {
  create: create,
  updateOne: updateOne,
  deleteOne: deleteOne,
  toggleAvailability: toggleAvailability,
};
