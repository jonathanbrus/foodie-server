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
  isPrime: {
    type: Schema.Types.Boolean,
    default: false,
    required: true,
  },
  userAddress: [
    {
      fullName: {
        type: Schema.Types.String,
        required: true,
      },
      phoneNo: {
        type: Schema.Types.String,
        required: true,
      },
      pincode: {
        type: Schema.Types.String,
        required: true,
      },
      city: {
        type: Schema.Types.String,
        required: true,
      },
      state: {
        type: Schema.Types.String,
        required: true,
      },
      doorNo: {
        type: Schema.Types.String,
        required: true,
      },
      street: {
        type: Schema.Types.String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
