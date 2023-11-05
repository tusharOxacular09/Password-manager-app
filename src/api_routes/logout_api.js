const express = require("express");
const app = express();

const logoutRouter = app.get("/", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

module.exports = logoutRouter;
