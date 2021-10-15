const image = require("../../../models/sliders");
const response = require("../../../utils/response");

const get = async (req, res, nex) => {
  const { imageFor } = req.query;

  try {
    const images = await image.findOne({ for: imageFor });

    res.json(response(200, `Fetched images for ${imageFor}`, images.images));
  } catch (e) {
    res.json(response(500, "Something went wrong"));
  }
};

module.exports = { get: get };
