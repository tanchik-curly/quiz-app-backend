const express = require("express");

const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(400).send("You do not have access token, login again!");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) res.json({ auth: false, message: "Your token is invalid!" });
      else next();
    });
  }
};

export default validateToken;
