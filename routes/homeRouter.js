const express = require("express");

const router = express.Router();

const Products = require("../models/productSchema");

router.get("/home", async (req, res) => {
  if (req.session.loggedIn) {
    // console.log(req.session.loggedIn)
    const data = await Products.find().lean();
    // console.log(data);
    res.render("home", { products: data });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
