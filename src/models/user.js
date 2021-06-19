const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
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
  userAddress: [
    {
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
  ],
});

module.exports = mongoose.model("users", userSchema);
