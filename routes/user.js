const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");

import models from "../models";
import validateToken from "../middlewares/auth";

const genereteToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 1000,
  });
  return token;
};

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  models.User.findOne({ where: { email: email } })
    .then((user) => {
      if (password !== user.dataValues.password)
        res.status(400).send("Password is invalid!");
      else {
        const id = user.dataValues.id;
        const token = genereteToken(id);
        res.json({ auth: true, jwt_token: token });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        auth: false,
        message: "Your data has not been approved, try again!",
      });
    });
});

router.post("/auth/register", async (req, res) => {
  try {
    const user = models.User.build({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      position: req.body.position,
    });

    await user.save();

    const id = user.dataValues.id;
    const token = genereteToken(id);
    res.json({ auth: true, jwt_token: token });
  } catch {
    res.json({
      auth: false,
      message: "Your data are incorrect, try again!",
    });
  }
});

module.exports = router;
