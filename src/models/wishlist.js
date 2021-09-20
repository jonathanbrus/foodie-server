const mongoose = require("mongoose");

const { Schema } = mongoose;

const wishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
  ],
});

module.exports = mongoose.model("wishlist", wishlistSchema);
