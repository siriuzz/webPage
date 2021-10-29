require("dotenv").config();

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/roleModel");

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
      const findUser = await User.findOne({ username: user.username }).populate(
        {
          path: "role",
          select: "value label"
        }
      );

      const findUserWithPassword = await User.findOne({
        username: user.username
      }).select("+password");

      const findUserObj = {
        _id: findUser._id,
        name: findUser.name,
        username: findUser.username,
        email: findUser.email,
        role: findUser.role
      };
      if (!findUser) {
        return res.status(401).json("wrong email or password");
      }

      if (await bcrypt.compare(user.password, findUserWithPassword.password)) {
        const accessToken = jwt.sign(
          findUserObj,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m"
          }
        );


        res.status(200).json({
          accessToken: accessToken
        });
      } else {
        res.status(401).json("wrong email or password");
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  });
};
