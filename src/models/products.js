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
    required: true,
  },
  category: {
    type: Schema.Types.String,
    required: true,
  },
  subCategory: {
    type: Schema.Types.String,
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
        required: true,
      },
      by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
    },
  ],
});

module.exports = mongoose.model("products", otherProductsSchema);
