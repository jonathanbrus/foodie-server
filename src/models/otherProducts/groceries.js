const mongoose = require("mongoose");

const { Schema } = mongoose;

const grocerySchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  image: {
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
  isActive: {
    type: Schema.Types.Boolean,
    required: true,
  },
  rating: {
    type: Schema.Types.Number,
    required: true,
  },
});

module.exports = mongoose.model("groceries", grocerySchema);
