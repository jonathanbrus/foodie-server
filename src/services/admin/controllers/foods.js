const foods = require("../../../models/food");

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
      fixedPrice: config.fixedPrice.trim(),
      offerPrice: config.offerPrice.trim(),
      packagingCharge: config.packagingCharge.trim(),
      availability: {
        from: config.availabilityTiming.from.trim(),
        to: config.availabilityTiming.to.trim(),
      },
      isActive: true,
      bestSeller: config.bestSeller,
      rating: [],
      restaurantId: config.restaurantId.trim(),
    });

    res.json({
      statusCode: 200,
      message: "Successfully deleted the food",
      created: created,
    });
  } catch (e) {
    console.log(e);
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
    fetched.veg = config.veg || fetched.veg;
    fetched.addons = config.addons || fetched.addons;
    fetched.toppings = config.toppings || fetched.toppings;
    fetched.sizes = config.sizes || fetched.sizes;
    fetched.buns = config.buns || fetched.buns;
    fetched.fixedPrice = config.fixedPrice || fetched.fixedPrice;
    fetched.offerPrice = config.offerPrice || fetched.offerPrice;
    fetched.packagingCharge = config.packagingCharge || fetched.packagingCharge;
    fetched.availability.from =
      config.availability.from || fetched.availability.from;
    fetched.availability.to = config.availability.to || fetched.availability.to;
    fetched.bestSeller = config.bestSeller || fetched.bestSeller;

    const updated = await fetched.save();

    res.json({
      statusCode: 200,
      message: "Successfully deleted the food",
      updated: updated,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteOne = async (req, res, nex) => {
  const { id } = req.query;
  try {
    await foods.deleteOne({ _id: id });

    res.json({
      statusCode: 200,
      message: "Successfully deleted the food",
    });
  } catch (e) {
    console.log(e);
  }
};

const toggleAvailability = async (req, res, nex) => {
  const { id } = req.body;
  try {
    const fetched = await foods.findById(id);

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
