const express = require("express");
const db = require("../config/database_config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const loginRouter = app.post("/", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json({ Error: "Login error in server" });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            const email = data[0].email;
            const token = jwt.sign({ email }, process.env.JWT_KEY, {
              expiresIn: "1d",
            });
            res.cookie("token", token);

            return res.json({ Status: "Success" });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "Email does not Exists" });
    }
  });
});

module.exports = loginRouter;
