const mongoose = require("mongoose");

const { Schema } = mongoose;

const foodSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  image: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  fixedPrice: {
    type: Schema.Types.Number,
    required: true,
  },
  offerPrice: {
    type: Schema.Types.Number,
    required: true,
  },
  isActive: {
    type: Schema.Types.Boolean,
    required: true,
  },
  category: {
    type: Schema.Types.String,
    required: true,
  },
  rating: {
    type: Schema.Types.Number,
    required: true,
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "restaurants",
  },
});

module.exports = mongoose.model("foods", foodSchema);
