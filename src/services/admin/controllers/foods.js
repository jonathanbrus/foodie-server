const foods = require("../../../models/food");

const response = require("../../../utils/response");

const create = async (req, res, nex) => {
  const { config } = req.body;

  try {
    const created = await foods.create({
      name: config.name.trim(),
      image: config.image.trim(),
      description: config.description.trim(),
      category: config.category.trim(),
      veg: config.veg,
      addons: config.addons,
      toppings: config.toppings,
      sizes: config.sizes,
      buns: config.buns,
      fixedPrice: Number(config.fixedPrice.trim()),
      offerPrice: Number(config.offerPrice.trim()),
      packingCharge: Number(config.packingCharge.trim()),
      timing: {
        from: Number(config.from.trim()),
        to: Number(config.to.trim()),
      },
      bestSeller: config.bestSeller,
      restaurantId: config.restaurantId.trim(),
    });

    res.json(response(200, "Successfully created the food", created));
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

const updateOne = async (req, res, nex) => {
  const { config } = req.body;

  try {
    const fetched = await foods.findById(config.id);

    fetched.name = config.name.trim() || fetched.name;
    fetched.image = config.image.trim() || fetched.image;
    fetched.description = config.description.trim() || fetched.description;
    fetched.category = config.category.trim() || fetched.category;
    fetched.veg = config.veg;
    fetched.addons = config.addons || fetched.addons;
    fetched.toppings = config.toppings || fetched.toppings;
    fetched.sizes = config.sizes || fetched.sizes;
    fetched.buns = config.buns || fetched.buns;
    fetched.fixedPrice = Number(config.fixedPrice.trim()) || fetched.fixedPrice;
    fetched.offerPrice = Number(config.offerPrice.trim()) || fetched.offerPrice;
    fetched.packingCharge =
      Number(config.packingCharge.trim()) || fetched.packingCharge;
    fetched.timing.from = Number(config.from.trim()) || fetched.timing.from;
    fetched.timing.to = Number(config.to.trim()) || fetched.timing.to;
    fetched.bestSeller = config.bestSeller;

    const updated = await fetched.save();

    res.json(response(200, "Successfully updated the food", updated));
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

const deleteOne = async (req, res, nex) => {
  const { id } = req.query;
  try {
    await foods.deleteOne({ _id: id });

    res.json(response(200, "Successfully deleted the food"));
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

const toggleAvailability = async (req, res, nex) => {
  const { id } = req.body;
  try {
    const fetched = await foods.findById(id);

    fetched.active = !fetched.active;

    const updated = await fetched.save();

    res.json(
      response(200, `Updated to ${updated.active}`, `${updated.active}`)
    );
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

module.exports = {
  create: create,
  updateOne: updateOne,
  deleteOne: deleteOne,
  toggleAvailability: toggleAvailability,
};
