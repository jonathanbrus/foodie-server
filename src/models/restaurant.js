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
  city: {
    type: Schema.Types.String,
    default: "Nagercoil",
    required: true,
  },
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
  topPicks: [{ type: Schema.Types.String }],
  popular: {
    type: Schema.Types.Boolean,
    default: false,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
  },
  offer: {
    type: Schema.Types.Number,
    default: 20,
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

module.exports = mongoose.model("restaurants", restaurantSchema);
