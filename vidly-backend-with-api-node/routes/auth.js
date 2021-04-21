const Joi = require("joi");
const bcrypt = require("bcrypt-nodejs");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  let validPassword = false;
  await bcrypt.compare(req.body.password, user.password, (error, valid) => {
    if (!valid) return res.status(400).send("Invalid email or password.");
    else {
      const token = user.generateAuthToken();
      res.send(token);
    }
  });
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
