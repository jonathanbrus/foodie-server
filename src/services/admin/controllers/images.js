const sliders = require("../../../models/sliders");

const response = require("../../../utils/response");

const add = async (req, res, nex) => {
  const { imageFor, images } = req.body;

  try {
    const addedImage = await sliders.create({
      for: imageFor,
      images: images,
    });

    res.json(response(200, "Added Image", addedImage));
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

const deleteOne = async (req, res, nex) => {
  const { id } = req.params;

  try {
    await sliders.deleteOne({ _id: id });

    res.json(response(200, "Deleted the image successfully"));
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

module.exports = {
  add: add,
  deleteOne: deleteOne,
};
