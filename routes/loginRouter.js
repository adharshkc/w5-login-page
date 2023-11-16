const express = require("express");
const data = require('../data/shoes.json')
// const path = require('path');
const session = require("express-session");
// const app = express();

const router = express.Router();


router.get("/", (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/home')
  }
  console.log("login");
  res.render("login");
});

router.post("/login", (req, res) => {

  console.log("session: "+req.sessionID)
  if(req.body.email == "adharshkc2017@gmail.com" && req.body.pass == '123'){
    req.session.user = req.body;
    req.session.loggedIn = true
      console.log("user is exist")
    res.redirect('/home')
  }else{
    res.render('login', {errorMessage: 'invalid username or password'})
  }
});

module.exports = router;
