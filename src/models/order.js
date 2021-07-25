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
    buyFrom: { type: Schema.Types.String, required: true },
    orderItems: [
      {
        name: { type: Schema.Types.String, required: true },
        image: { type: Schema.Types.String, required: true },
        price: { type: Schema.Types.Number, required: true },
        quantity: { type: Schema.Types.Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: {
        type: Schema.Types.String,
        required: true,
      },
      phone: {
        type: Schema.Types.Number,
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
    isPaid: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    taxAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    deliveryCharge: {
      type: Schema.Types.Number,
      required: true,
    },
    totalAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    orderStatus: {
      type: Schema.Types.String,
      enum: ["Order placed", "Packed", "Delivered", "Canceled"],
      default: "Order placed",
      required: true,
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
