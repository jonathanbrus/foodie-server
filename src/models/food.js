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
  addons: [
    {
      name: { type: Schema.Types.String },
      price: { type: Schema.Types.Number },
    },
  ],
  toppings: [
    {
      name: { type: Schema.Types.String },
      price: { type: Schema.Types.Number },
    },
  ],
  sizes: [
    {
      name: { type: Schema.Types.String },
      price: { type: Schema.Types.Number },
    },
  ],
  buns: [
    {
      name: { type: Schema.Types.String },
      price: { type: Schema.Types.Number },
    },
  ],
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
  timing: {
    from: {
      type: Schema.Types.Number,
      default: 10,
    },
    to: {
      type: Schema.Types.Number,
      default: 22,
    },
  },
  isActive: {
    type: Schema.Types.Boolean,
    default: true,
  },
  bestSeller: {
    type: Schema.Types.Boolean,
    default: false,
  },
  rating: [
    {
      star: {
        type: Schema.Types.Number,
      },
      by: {
        type: Schema.Types.ObjectId,
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
