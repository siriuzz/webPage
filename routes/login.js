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
      const { username, password } = req.body;

      const user = {
        username,
        password
      };
      const findUser = await User.findOne({ username: user.username });

      if (!findUser) {
        return res.status(401).json("wrong email or password");
      }

      if (await bcrypt.compare(user.password, findUser.password)) {
        const findAllUsers = User.find();
        const accessToken = jwt.sign(findAllUsers, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "30m"
        });
        res.status(200).json({
          accessToken: accessToken
        });
      } else {
        res.status(401).json("wrong email or password");
      }

      // console.log(users.find({username: user.name}));
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });
};
