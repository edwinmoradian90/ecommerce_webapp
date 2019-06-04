const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const keys = require("../../config/keys");

router.get("/test", (req, res) => {
  return res.json({ msg: "test works" });
});

router.post("/register", (req, res) => {
  const errors = {};
  User.findOne({ email: req.body.email })
    .then(email => {
      if (email) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        let newUser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(newUser => res.json(newUser))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = {};
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.user = "User not found";
      return res.status(404).json(errors);
    }
    //note: Don't know why, but in mongo its _id, but only works as user.id.
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
          address: user.address,
          isAdmin: user.isAdmin
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      password: req.user.password,
      address: req.user.address,
      isAdmin: req.user.isAdmin
    });
  }
);

router.get("/all", (req, res) => {
  const errors = {};

  User.find()
    .populate("users", ["first_name", "isAdmin"])
    .then(user => {
      if (!user) {
        errors.user = "Users does not exist";
        return res.status(404).json(errors);
      }

      res.send(user);
    })
    .catch(err => console.log(err));
});

router.get("/:user", (req, res) => {
  const errors = {};

  User.findOne({ _id: req.params.user })
    .then(user => {
      if (!user) {
        errors.user = "User not found";
        return res.status(404).json(errors);
      } else {
        res.json(user);
      }
    })
    .catch(err => console.log(err));
});

//User Info Update
router.put(
  "/update/:user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    let conditions = {
      _id: req.params.user
    };
    User.findByIdAndUpdate(conditions, req.body, { new: true })
      .then(user => {
        if (!user) {
          errors.user = "User not found";
          return res.status(404).json(errors);
        } else {
          res.json(user);
        }
      })
      .catch(err => console.log(err));
  }
);

router.patch(
  "/update/:user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    let id = {
      _id: req.params.user
    };
    User.findOneAndUpdate(id, { $set: { address: req.body } })
      .then(user => {
        if (!user) {
          errors.user = "User not found";
          return res.status(404).json(errors);
        } else {
          res.json(user);
        }
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
