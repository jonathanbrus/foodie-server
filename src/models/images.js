const mongoose = require("mongoose");

const { Schema } = mongoose;

const imagesSchema = new Schema({
  imageFor: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  image: {
    type: Schema.Types.String,
    required: true,
  },
});

module.exports = mongoose.model("images", imagesSchema);
