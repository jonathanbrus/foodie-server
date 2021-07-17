const mongoose = require("mongoose");

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
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
  image: {
    type: Schema.Types.String,
    required: true,
  },
  restaurantAddress: {
    landmark: {
      type: Schema.Types.String,
    },
    address: {
      type: Schema.Types.String,
    },
    city: {
      type: Schema.Types.String,
      required: true,
    },
  },
  // city: {
  //   type: Schema.Types.String,
  //   required: true,
  // },
  geoPoint: {
    lat: {
      type: Schema.Types.Number,
      required: true,
    },
    long: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  isActive: {
    type: Schema.Types.Boolean,
    default: true,
  },
  offer: {
    type: Schema.Types.Number,
    required: true,
  },
  timing: {
    from: {
      type: Schema.Types.Number,
      required: true,
    },
    to: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  rating: { type: Schema.Types.Number },
});

module.exports = mongoose.model("restaurants", restaurantSchema);
