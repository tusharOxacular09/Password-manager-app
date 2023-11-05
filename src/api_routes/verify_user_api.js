const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not logged in" });
  } else {
    // verify token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not okay" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

const verifyUserRoute = app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", email: req.email });
});

module.exports = verifyUserRoute;