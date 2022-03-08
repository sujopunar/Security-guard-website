const mongoose = require("mongoose");
// const { stringify } = require("nodemon/lib/utils");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    unique: true,
    index: true,
    required: true,
    max: 255,
  },
  email: {
    type: String,
    min: 3,
    unique: true,
    index: true,
    required: true,
    max: 400,
  },
  phonenumber: {
    type: Number,
    min: 6,
    required: true,
    max: 20,
  },
  streetnumber: {
    type: Boolean,
    min: 6,
    required: true,
    max: 20,
  },
  password: {
    type: String,
    min: 6,
    required: true,
    max: 1024,
  },
});
//assign the user schema to a model
const register = mongoose.model("User", userSchema);

module.exports = register; //when it is called in to app.js it is exported as a module
