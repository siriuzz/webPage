const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/userModel");
const expressLayouts = require("express-ejs-layouts");

router.get("/", (req, res) => {
  res.render("register.ejs", { layout: "layouts/noNavbar.ejs" });
});

router.post("/", (req, res) => {
  //conectar con base de datos mongoose
  const mongoose = require("mongoose");
  mongoose.Promise = global.Promise;

  mongoose.connect("mongodb://localhost/accounts", function (error) {
    if (error) {
      console.log("Error!" + error);
    }
  });

  //send data mongoose
  mongoose.connection
    .once("open", () => {
      console.log("Connected");

      const { name, username, email, password } = req.body;
      const newUser = new User({
        name,
        username,
        email,
        password,
      });

      newUser.save((err, data) => {
        if (err) {
          console.log(error);
        } else {
          console.log('data saved')
        }
      });
    })
    .on("error", (error) => {
      console.log("Error:", error);
    });
    res.json({ok: 'true'});
});

module.exports = router;
