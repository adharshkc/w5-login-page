const express = require("express");
const User = require("../models/userSchema");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const router = express.Router();
const auth = function (req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/");
  }
};
router.get("/admin", async (req, res) => {
  if (req.session.loggedIn) {
    const users = await User.find({ role: "user" }).lean();
    res.render("admin", { user: users });
  } else {
    res.redirect("/");
  }
});

router.get("/admin/delete-user/:id", auth, async (req, res) => {
  // console.log(req.params.id)
  const userId = req.params.id;
  const deletedUser = await User.deleteOne({ _id: userId });
  if (deletedUser) {
    res.redirect("/admin");
  } else {
    res.render("/");
  }
});

router.get("/admin/edit-user/:id", auth, async (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId }).lean();
  // console.log(user.fullName)
  res.render("edit-user", { data: user });
});

router.post("/admin/edit-user/:id", async function (req, res) {
  const idString = req.params.id;
  const userId = new ObjectId(idString);
  const fullName = req.body.fullName;
  const phone = req.body.phone;
  const email = req.body.email;
  const gender = req.body.gender;
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        fullName: fullName,
        phone: phone,
        email: email,
        gender: gender,
      },
    },
    { new: true }
  );
  if (updatedUser) {
    res.redirect("/admin");
  }
});

router.get("/admin/add-user", auth, function(req, res){
  res.render("add-user")
})

router.post("/admin/add-user", async function(req, res){
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
      res.redirect("/admin")
    }
  } else {
    res.render("register", {
      errorMessage: "user already exist, kindly login",
    });
  }
})

router.post("/admin/search/", async function(req, res){
  const word = req.body.keyword
  const users = await User.find({ fullName: { $regex: `^${word}`, $options: 'i' } }).lean();
  res.render('admin', {user: users})
  // console.log(users)
})
router.get("/admin/search", function(req,res){
  res.redirect("/admin")
})

module.exports = router;
