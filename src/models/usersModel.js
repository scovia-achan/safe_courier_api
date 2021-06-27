const mongoose = require("mongoose");
const {isEmail} = require("validator")

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please enter first name"],
  },
  lastName: {
    type: String,
    required: [true, "please enter last name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please enter an email"],
    validate: [isEmail, "Please enter a valid email"]
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: 6,
    maxlength: 30
  },
  password2: {
    type: String,
    required: [true, "please enter a password"],
    minlength: 6,
    maxlength: 30
  },
});

module.exports = mongoose.model("User", UserSchema);
