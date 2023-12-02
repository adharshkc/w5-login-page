const express = require("express");
const data = require("../data/shoes.json");
// const authController = require("../controllers/userController");
const User = require("../models/userSchema");
const { userLogin, userRegister } = require("../middlewares/userAuth");

const router = express.Router();

//login page get
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/home");
  }
  // console.log("login");
  res.render("login");
});

//register page get
router.get("/register", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/home");
  } else {
    res.render("register");
  }
});


/*post login*/
router.post("/login", userLogin, (req, res) => {
  try {
    const validatedUser = req.user;
    req.session.user = validatedUser;
    const validatedAdmin = req.admin;
    req.session.admin = validatedAdmin;
    req.session.loggedIn = true;
    if(req.session.user){
      res.redirect("/home");

      console.log("user authenticated and logged in...");
    }else if(req.session.admin){
      res.redirect("/admin")
    }
  } catch (err) {
    console.log(err);
  }
});

//post register

router.post("/register", userRegister, (req, res) => {
  try {
    const regsiteredUser = req.user;
    req.session.user = regsiteredUser;
    req.session.loggedIn = true;
    res.redirect("home");
    console.log("user registered and logged in...");
  } catch (err) {
    console.log(err);
  }
});




//logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
