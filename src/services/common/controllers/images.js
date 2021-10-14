const image = require("../../../models/sliders");
const error = require("../../../utils/error");

const get = async (req, res, nex) => {
  const { imageFor } = req.query;

  try {
    const images = await image.findOne({ for: imageFor });

    res.json({
      statusCode: "200",
      message: `Fetched images for ${imageFor}`,
      images: images.images,
    });
  } catch (e) {
    res.json(error(500, "Something went wrong"));
  }
};

module.exports = { get: get };
