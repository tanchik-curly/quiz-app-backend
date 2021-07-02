const express = require("express");

const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("TOKEN " + token);
  if (token === "null") {
    res.status(401).send("You do not have access token, login again!");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ auth: false, message: "Your token is invalid!" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

export default validateToken;
