const images = require("../models/images");

const addImage = async (req, res, nex) => {
  const { imageFor, image } = req.body;
  try {
    const addedImage = await images.create({
      imageFor: imageFor,
      image: image,
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
  const { id } = req.query;

  try {
    await images.deleteOne({ _id: id });

    res.json({
      message: "Deleted image",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  addImage: addImage,
  deleteImage: deleteImage,
};
