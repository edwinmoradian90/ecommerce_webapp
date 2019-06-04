const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const SERVER_CONFIGS = require("./constants/server");
const path = require("path");
const configureServer = require("./server");
const configureRoutes = require("./routes");
const users = require("./routes/api/users");
const products = require("./routes/api/products");
const payment = require("./routes/api/payment");
const cors = require("cors");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware

app.use(passport.initialize());

// Passport Config

require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/payment", payment);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//app.use(cors(corsOptions));

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = configureServer;
