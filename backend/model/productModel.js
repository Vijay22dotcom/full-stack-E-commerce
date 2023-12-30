const mongoose = require("mongoose");
const User = require("../model/userModel");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter product name "],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "plese enter product description "],
    },

    price: {
      type: Number,
      required: [true, "plese enter product price "],
      maxLength: [8, "price cannot exceed  8 character"],
    },

    ratings: {
      type: Number,
      default: 0,
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: Array,
      required: [true, "plese enter product category"],
    },

    stock: {
      type: Number,
      required: [true, "plese enter product stock "],
      maxLength: [4, "stock cannot exceed  4 character"],
      default: 1,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "user",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
