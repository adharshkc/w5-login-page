const express = require("express");
const User = require("../models/userSchema");
const app = express();

async function userAuth(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({email: email})
  if(user){
    const result = password == user.password
    req.user = user;
    if(result){
        console.log("user authenticated")
        next();
    }else{
        console.log("invalid password");
        return res.render("login", { errorMessage: "invalid password" });
    }
  }else{
    console.log("user not found");
    return res.render("login", { errorMessage: "user not found" });
  }
}

module.exports = userAuth;