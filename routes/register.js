const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.get("/register", (req, res) => {
    res.render("register", {
      layout: "layouts/empty.ejs",
      title: "Register"
    });
  });

  app.post("/register", async (req, res) => {
    //send data mongoose
    const { name, username, email, password } = req.body;

    const userTaken = await User.findOne({ username: username });
    const emailTaken = await User.findOne({ email: email });

    if (userTaken && emailTaken) {
      return res.status(401).json({
        error: [
          {
            text: "Username already exists",
            field: "username-taken"
          },
          { text: "Email already exists", field: "email-taken" }
        ]
      });
    }

    if (userTaken) {
      return res.status(401).json({
        error: [
          {
            text: "Username already exists",
            field: "username-taken"
          }
        ]
      });
    }

    if (emailTaken) {
      return res.status(401).json({
        error: [{ text: "Email already exists", field: "email-taken" }]
      });
    }

    const newUser = new User({
      name,
      username,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const newUserData = await newUser.save();

    const user = {
      _id: newUserData._id,
      name,
      username,
      email
    };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m"
    });

    res.status(200).json({
      accessToken: accessToken,
      _id: newUserData._id,
      name: name,
      username: username,
      email: email
    });
  });
};
