const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    isFood: {
      type: Schema.Types.Boolean,
      required: true,
    },
    orderItems: [
      {
        name: { type: Schema.Types.String, required: true },
        qty: { type: Schema.Types.Number, required: true },
        image: { type: Schema.Types.String, required: true },
        price: { type: Schema.Types.Number, required: true },
      },
    ],
    shippingAddress: {
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
    paymentMethod: {
      type: Schema.Types.String,
      required: true,
    },
    // paymentResult: {
    //   id: { type: String },
    //   status: { type: String },
    //   update_time: { type: String },
    //   email_address: { type: String },
    // },
    taxPrice: {
      type: Schema.Types.Number,
      required: true,
      default: 0.0,
    },
    deliveryPrice: {
      type: Schema.Types.Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Schema.Types.Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    isDelivered: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Schema.Types.Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
