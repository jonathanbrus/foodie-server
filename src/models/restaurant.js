const mongoose = require("mongoose");

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  image: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  restaurantAddress: {
    landmark: {
      type: Schema.Types.String,
    },
    address: {
      type: Schema.Types.String,
      required: true,
    },
    city: {
      type: Schema.Types.String,
      required: true,
    },
  },
  isActive: { type: Schema.Types.Boolean },
  timing: {
    from: { type: Schema.Types.Number },
    to: { type: Schema.Types.Number },
  },
  rating: { type: Schema.Types.Number },
  offer: { type: Schema.Types.Number },
});

module.exports = mongoose.model("restaurants", restaurantSchema);
