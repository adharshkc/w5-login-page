const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
