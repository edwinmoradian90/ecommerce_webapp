const paymentApi = require("./api/payment");

const configureRoutes = app => {
  paymentApi(app);
};

module.exports = configureRoutes;
