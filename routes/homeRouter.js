const express = require("express");
// const data = require('../data/shoes.json')

const router = express.Router();

const Products = require("../models/productSchema");


router.get("/home", async (req, res) => {
  if (req.session.loggedIn) {
    const data = await Products.find().lean();
            // console.log(data)
            res.render("home", { products: data });
         
  } else {
    res.redirect("/");
  }

});

// router.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });

module.exports = router;
