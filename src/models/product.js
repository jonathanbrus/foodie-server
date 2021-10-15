const mongoose = require("mongoose");

const { Schema } = mongoose;

const otherProductsSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  image: [
    {
      type: Schema.Types.String,
      required: true,
    },
  ],
  description: {
    type: Schema.Types.String,
    required: true,
  },
  productDetail: [
    {
      type: Schema.Types.String,
      required: true,
    },
  ],
  category: {
    type: Schema.Types.String,
    required: true,
  },
  subCategory: {
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
  itemsInStock: {
    type: Schema.Types.Number,
    default: 100,
    required: true,
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
});

module.exports = mongoose.model("products", otherProductsSchema);
