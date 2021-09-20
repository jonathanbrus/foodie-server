const mongoose = require("mongoose");

const { Schema } = mongoose;

const slidersSchema = new Schema({
  for: {
    type: Schema.Types.String,
    required: true,
  },
  images: {
    type: Schema.Types.Array,
    required: true,
  },
});

module.exports = mongoose.model("sliders", slidersSchema);
