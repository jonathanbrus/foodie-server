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
  emailVerified: {
    type: Schema.Types.Boolean,
    default: false,
  },
  phone: {
    type: Schema.Types.String,
    required: true,
  },
  phoneVerified: {
    type: Schema.Types.Boolean,
    default: false,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  primeMember: {
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
      phone: {
        type: Schema.Types.String,
        required: true,
      },
      pincode: {
        type: Schema.Types.String,
        required: true,
      },
      address: {
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
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
