const express = require("express");
const User = require("../models/userSchema");
const app = express();

async function userLogin(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (user) {
    const result = password == user.password;
    req.user = user;
    if (result) {
      console.log("user authenticated");
      next();
    } else {
      console.log("invalid password");
      return res.render("login", { errorMessage: "invalid password" });
    }
  } else {
    console.log("user not found");
    return res.render("login", { errorMessage: "user not found" });
  }
}

async function userRegister(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const dbEmail = await User.findOne({ email: email });
  if (dbEmail === null) {
    const user = await User.create({ email: email, password: password });
    user.save();
    if (user) {
      console.log("user created");
      req.user = user;
      next();
    }
  } else {
    res.render("register", {
      errorMessage: "user already exist, kindly login",
    });
  }
}

module.exports = {userLogin, userRegister};
