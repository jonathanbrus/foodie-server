const mongoose = require("mongoose");

const { Schema } = mongoose;

const giftSchema = new Schema({
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
  rating: {
    type: Schema.Types.Number,
    required: true,
  },
});

module.exports = mongoose.model("gifts", giftSchema);
