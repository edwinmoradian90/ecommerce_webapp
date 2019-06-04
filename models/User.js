const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  address: {
    type: Array
  },
  recentlyViewed: {
    pages: {
      type: Array
    },
    products: {
      type: Array
    }
  },
  wishList: {
    type: Array
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  loggedIn: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
