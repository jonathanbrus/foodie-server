const mongoose = require("mongoose");

const { Schema } = mongoose;

const deliveryManSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  phone: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
});

module.exports = mongoose.model("deliveryman", deliveryManSchema);
