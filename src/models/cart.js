const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  cartItems: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      quantity: {
        type: Schema.Types.Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("carts", cartSchema);
