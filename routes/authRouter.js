const express = require("express");
const data = require("../data/shoes.json");
// const authController = require("../controllers/userController");
const User = require("../models/userSchema");

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

// router.post("/login", (req, res) => {
//   console.log("session: "+req.sessionID)
//   if(req.body.email == "adharshkc2017@gmail.com" && req.body.pass == '123'){
//     req.session.user = req.body;
//     req.session.loggedIn = true
//       console.log("user is exist")
//     res.redirect('/home')
//   }else{
//     res.render('login', {errorMessage: 'invalid username or password'})
//   }
// });

/*post login*/
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log(password);
    const user = await User.findOne({ email: email });
    if (user) {
      const result = password == user.password;
      if (result) {
        req.session.user = req.body;
        req.session.loggedIn = true;
        res.redirect("/home");
        console.log("user authenticated");
      } else {
        console.log("invalid password");
        res.render("login", { errorMessage: "invalid password" });
      }
    } else {
      res.render("login", { errorMessage: "user not found" });
      console.log("user not found");
    }
  } catch (err) {
    console.log(err);
  }
});

//post register

router.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const dbEmail = await User.findOne({ email: email });
    if (dbEmail === null) {
      
      console.log("creating user");
      const user = await User.create({ email: email, password: password });
      user.save()
      if (user) {
        req.session.user = req.body;
        req.session.loggedIn = true;
        console.log("user created");
        res.redirect("/home");
        console.log(user);
      }
    } else {
      res.render("register", { errorMessage: "user already exist, kindly login" });
  }
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
