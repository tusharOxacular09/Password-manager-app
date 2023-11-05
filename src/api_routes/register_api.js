const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/database_config");
const app = express();
const salt = 10;

const registerRouter = app.post("/", (req, res) => {
  const sql = "INSERT INTO users (`email`, `password`) VALUES (?)";

  // encryption of password
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) {
      return res.json({ Error: "Error for hashing password" });
    }
    const values = [req.body.email, hash];
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.log(err.message);
        return res.json({ Error: "Inserting data Error in server" });
      } else {
        return res.json({ Status: "Success" });
      }
    });
  });
});

module.exports = registerRouter;
