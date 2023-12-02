const express = require("express");
const User = require("../models/userSchema");
const app = express();

async function userLogin(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email,role: "user" });
  const admin = await User.findOne({ email: email, role: "admin" });
  if (user) {
    const result = password == user.password;
    req.user = user;
    req.admin = admin;
    // console.log(req.admin);

    if (result) {
      console.log("user authenticated");
      next();
    } else {
      console.log("invalid password");
      return res.render("login", { errorMessage: "invalid password" });
    }
  } else if(admin){
    const result = password == admin.password;
    req.admin = admin
    if(result){
      console.log("admin authenticated")
      next()
    }
  } else {
    console.log("user not found");
    return res.render("login", { errorMessage: "user not found" });
  }
}

async function userRegister(req, res, next) {
  const fullName = req.body.fullName;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender
  const dbEmail = await User.findOne({ email: email });
  if (dbEmail === null) {
    const user = await User.create({
      fullName: fullName,
      phone: phone,
      email: email,
      password: password,
      gender: gender
    });
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

module.exports = { userLogin, userRegister };
