const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    default: 1
  },
  featured: {
    type: Boolean,
    default: false
  },
  viewed: {
    type: Boolean,
    default: false,
    date: {
      type: Date,
      default: Date.now()
    }
  },
  onsale: {
    type: Boolean,
    default: false
  },

  instock: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
