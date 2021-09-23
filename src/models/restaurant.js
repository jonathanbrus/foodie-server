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

module.exports = mongoose.model("restaurants", restaurantSchema);
