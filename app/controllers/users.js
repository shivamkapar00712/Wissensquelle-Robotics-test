const express = require("express");
const { User } = require("../models/User");
const { validate } = require("../validation/validateUser");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const CRYPTO_SECRET = "342lrj209:felfkp43ijdfkj:a092lknfe";

exports.login = async (req, res) => {
  const validUser = await User.findOne({ email: req.body.email });
  if (!validUser)
    return res.status(404).send("No User is register with this email id");

  const decryptedPass = crypto.AES.decrypt(
    validUser.password,
    CRYPTO_SECRET
  ).toString(crypto.enc.Utf8);

  if (decryptedPass !== req.body.password)
    return res.status(400).send(`wrong credentials`);

  const token = validUser.generateToken();
  res.send({ message: "Successfull login", token });
};

exports.register = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email Id already exists");

  user = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    password: req.body.password,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
    role: req.body.role,
  });

  const encryptPass = crypto.AES.encrypt(
    user.password,
    CRYPTO_SECRET
  ).toString();
  user.password = encryptPass;
  const token = user.generateToken();
  const result = await user.save();
  console.log(result);
  res.send({ message: `succesfully Registered new ${user.role}`, token });
};
