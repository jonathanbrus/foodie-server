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
  category: {
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
  packagingCharge: {
    type: Schema.Types.Number,
    default: 0,
    required: true,
  },
  availabilityTiming: {
    from: { type: Schema.Types.Number },
    to: { type: Schema.Types.Number },
  },
  isActive: { type: Schema.Types.Boolean },
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
