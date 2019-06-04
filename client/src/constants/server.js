const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "http://myapidomain.com"
    : "/routes/stripe";

export default PAYMENT_SERVER_URL;
