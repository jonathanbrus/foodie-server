const sliders = require("../models/sliders");

const getSlider = async (req, res, nex) => {
  const { imageFor } = req.params;

  try {
    const slider = await sliders.findOne({ for: imageFor });

    res.json({
      sliders: slider.images,
    });
  } catch (e) {
    console.log(e);
  }
};

const addImage = async (req, res, nex) => {
  const { imageFor, images } = req.body;

  try {
    const addedImage = await sliders.create({
      for: imageFor,
      images: images,
    });

    res.json({
      message: "Added Image",
      addedImage: addedImage,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteImage = async (req, res, nex) => {
  const { id } = req.params;

  try {
    await sliders.deleteOne({ _id: id });

    res.json({
      message: "Deleted image",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getSlider: getSlider,
  addImage: addImage,
  deleteImage: deleteImage,
};
