// const User = require("../models/userSchema");

// async function adminLogin(req, res, next) {
  // const admin = await User.findOne({ email: email, role: "admin" });
  // if (admin) {
  //   const result = password == admin.password;
  //   if (result) {
  //     console.log("admin logged in successfully");
  //     // res.redirect("/admin");
  //     next();
  //   } else {
  //     console.log("invalid admin password");
  //   }
  // } else {
  //   console.log("admin not found");
  // }
//   const email = req.email;
//   const password = req.password;

//   const admin = await User.findOne({email: email});
//   if(admin){
//     const result = password == admin.password;
//     if(result){
//       if(admin.role==="admin"){
//         console.log("admin authenticated");
//         next()
//       }
//     }else{
//       console.log("invalid password");
//       return res.render("login", { errorMessage: "invalid password" });
//     }
//   }

// }

// module.exports = adminLogin;
