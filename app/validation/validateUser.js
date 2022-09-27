const express = require("express");
const Joi = require("joi");

exports.validate = function (user) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(255),
    middleName: Joi.string(),
    lastName: Joi.string().required().min(3).max(255),
    password: Joi.string().required().regex(/^[a-zA-Z0-9_][a-zA-Z0-9_.]*/),
    country: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().required().email(),
    role: Joi.string().required().valid('user','agent','admin'),
  });

  return schema.validate(user);
};
