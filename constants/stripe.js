const configureStripe = require("stripe");

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === "production"
    ? "sk_live_MY_SECRET_KEY"
    : "pk_test_U1UOM3xqOl9mU5smnBP9KB9m";

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
