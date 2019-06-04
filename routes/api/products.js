const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");

router.get("/test", (req, res) => {
  return res.json({ msg: "test works" });
});

router.post("/", (req, res) => {
  //Validation and Authentication

  const errors = {};

  Product.findOne({ name: req.body.name }).then(product => {
    if (product) {
      errors.name = "Product already exists";
      return res.status(400).json(errors);
    } else {
      const newProduct = new Product({
        category: req.body.category,
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        price: req.body.price
      });

      console.log(newProduct);

      newProduct
        .save()
        .then(product => res.json(product))
        .catch(err => console.log(err));
    }
  });
});

router.get("/", (req, res) => {
  //Validations and Authentication

  const errors = {};

  Product.findOne({ name: req.body.name })
    .then(product => {
      if (!product) {
        errors.name = "Product does not exist";
        return res.status(404).json(errors);
      }
      return res.send(product);
    })
    .catch(err => console.log(err));
});

router.get("/all", (req, res) => {
  const errors = {};

  Product.find()
    .populate("product", ["category", "name"])
    .then(products => {
      if (!products) {
        errors.noproducts = "No products";
        return res.status(404).json(errors);
      }

      res.send(products);
    })
    .catch(err => console.log(err));
});

router.get("/:product", (req, res) => {
  const errors = {};
  Product.findOne({ name: req.params.product })
    .then(product => {
      if (!product) {
        errors.product = `Product doesn't exist`;
        return res.status(404).json(errors);
      }

      res.send(product);
    })
    .catch(err => console.log(err));
});

router.put("/dashboard/featured/:product", (req, res) => {
  Product.findOne({ name: req.params.product }).then(product => {
    let featured = product.featured;

    Product.findOneAndUpdate(
      { name: req.params.product },
      featured ? { $set: { featured: false } } : { $set: { featured: true } }
    )
      .then(product => res.json(product))
      .catch(err => console.log(err));
  });
});

router.put("/dashboard/onsale/:product", (req, res) => {
  Product.findOne({ name: req.params.product }).then(product => {
    let onsale = product.onsale;

    Product.findOneAndUpdate(
      { name: req.params.product },
      onsale ? { $set: { onsale: false } } : { $set: { onsale: true } }
    )
      .then(product => res.json(product))
      .catch(err => console.log(err));
  });
});

router.put("/dashboard/instock/:product", (req, res) => {
  Product.findOne({ name: req.params.product }).then(product => {
    let instock = product.instock;

    Product.findOneAndUpdate(
      { name: req.params.product },
      instock ? { $set: { instock: false } } : { $set: { instock: true } }
    )
      .then(product => res.json(product))
      .catch(err => console.log(err));
  });
});

router.delete(`/dashboard/:product`, (req, res) => {
  const errors = {};
  Product.findOneAndDelete({ name: req.params.product })
    .then(product => {
      if (!product) {
        errors.product = `Product doesn't exist`;
        return res.status(404).json(errors);
      } else {
        res.json(product.data);
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
