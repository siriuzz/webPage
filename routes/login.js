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
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "30s"
        });
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken
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

function generateAccessToken(user) {
  return jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "20s"
    },
    (err, token) => {
      if (err) {
        console.log("ocurrio un error", err);
      }
      res.send(token);
    }
  );
}
