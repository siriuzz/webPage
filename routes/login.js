require("dotenv").config();

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
  });

  app.post("/login", async (req, res) => {
    try {
      const user = {
        username: req.body.username,
        password: req.body.password,
      };

      const findUser = await User.findOne({ username: user.username });

      if (!findUser) {
        return res.status(401).json("user does not exist");
      }

      if (await bcrypt.compare(user.password, findUser.password)) {
        res.status(200).json("success");

      } else {
        res.status(401).json("not allowed");
      }

      // console.log(users.find({username: user.name}));
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });
};
