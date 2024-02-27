const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
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
  },
  { timestamps: true }
);

userSchema.method.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  return obj;
};

userSchema.method.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    // expiresIn: "1d",
  });
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
