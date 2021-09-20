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
  veg: {
    type: Schema.Types.Boolean,
    default: false,
  },
  addons: {
    type: Schema.Types.Array,
  },
  toppings: {
    type: Schema.Types.Array,
  },
  sizes: {
    type: Schema.Types.Array,
  },
  buns: {
    type: Schema.Types.Array,
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
  availability: {
    from: { type: Schema.Types.Number },
    to: { type: Schema.Types.Number },
  },
  isActive: { type: Schema.Types.Boolean },
  bestSeller: {
    type: Schema.Types.Boolean,
    default: false,
  },
  rating: [
    {
      star: {
        type: Schema.Types.Number,
        required: true,
      },
      by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
    },
  ],
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "restaurants",
  },
});

module.exports = mongoose.model("foods", foodSchema);
