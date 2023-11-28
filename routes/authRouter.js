const express = require("express");
const data = require("../data/shoes.json");
// const authController = require("../controllers/userController");
const User = require("../models/userSchema");
const {userLogin, userRegister} = require("../middlewares/authentication");

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
router.post("/login", userLogin,  (req, res) => {
  try {
    const validatedUser = req.user;
    req.session.user = validatedUser;
    req.session.loggedIn = true;
    res.redirect("/home");
    console.log("user authenticated and logged in...");
  } catch (err) {
    console.log(err);
  }
});

//post register

router.post("/register",userRegister, async (req, res) => {
  try {
    // const email = req.body.email;
    // const password = req.body.password;
    // const dbEmail = await User.findOne({ email: email });
    // if (dbEmail === null) {
    //   console.log("creating user");
    //   const user = await User.create({ email: email, password: password });
    //   user.save();
    //   if (user) {
    //     req.session.user = req.body;
    //     req.session.loggedIn = true;
    //     console.log("user created");
    //     res.redirect("/home");
    //     console.log(user);
    //   }
    // } else {
    //   res.render("register", {
    //     errorMessage: "user already exist, kindly login",
    //   });
    // }

    const regsiteredUser = req.user
    req.session.user = regsiteredUser;
    req.session.loggedIn = true;
    res.redirect("home")
    console.log("user registered and logged in...")
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
