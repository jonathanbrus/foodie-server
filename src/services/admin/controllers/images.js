const sliders = require("../../../models/sliders");

const add = async (req, res, nex) => {
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

const deleteOne = async (req, res, nex) => {
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
  add: add,
  deleteOne: deleteOne,
};
