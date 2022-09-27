const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = process.env;

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  middleName: {
    type: String,
  },

  lastName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    requried: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    min: 1000000000,
    max: 9999999999,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "agent"],
    default: "user",
    required: true,
  },
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, JWT_TOKEN);
};

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
