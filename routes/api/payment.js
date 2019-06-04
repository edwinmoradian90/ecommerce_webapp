const stripe = require("stripe")("pk_test_U1UOM3xqOl9mU5smnBP9KB9m");
const express = require("express");

const router = express.Router();

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.get("/stripe", (req, res) => {
  res.send({
    message: "Hello Stripe checkout server!",
    timestamp: new Date().toISOString()
  });
});

router.post("/stripe", (req, res) => {
  console.log("assfuck");
  stripe.charges.create(req.body, postStripeCharge(res));
});

module.exports = router;
