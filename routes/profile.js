const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { checkToken } = require("../public/auth");

module.exports = (app) => {
  app.get("/profile", checkToken, (req, res) => {
    res.render("profile", { title: "Profile" });
  });

  app.delete("/profile", async (req, res) => {
    try {
      const username = req.body.username;
      await User.deleteOne({ username: username });

      res.status(200).json({ result: "account deleted" });
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/get-profile", async (req, res) => {
    try {
      const cookie = req.headers["cookie"];
      const token = cookie.replace("accessToken=", "");
      const userInfo = jwt.decode(token);

      res.status(200).json({
        user: userInfo
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  app.put("/edit-profile", async (req, res) => {
    try {
      let { name, username, email, password, oldPassword } = req.body;

      const cookie = req.headers["cookie"];
      const token = cookie.replace("accessToken=", "");
      const decodedToken = jwt.decode(token);

      const id = decodedToken._id;
      const user = await User.findById(id).select("+password");

      if(user == null){
        res.status(500).json({
          error: [
            {
              text: "Missing Token",
              field: "old-password",
              alert: "old-password-error"
            }
          ]
        })
      }

      const userTaken = await User.findOne({ username: username });
      const emailTaken = await User.findOne({ email: email });
      const compareOldPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (
        (userTaken && username != user.username) ||
        (emailTaken && email != user.email) ||
        !compareOldPassword
      ) {
        const errorArray = [];

        if (userTaken && username != user.username) {
          errorArray.push({
            text: "Username already exists",
            field: "edit-username",
            alert: "username-error"
          });
        }

        if (emailTaken && email != user.email) {
          errorArray.push({
            text: "Email already exists",
            field: "edit-email",
            alert: "email-error"
          });
        }

        if (!compareOldPassword) {
          errorArray.push({
            text: "Incorrect Password",
            field: "old-password",
            alert: "old-password-error"
          });
        }

        return res.status(401).json({
          error: errorArray
        });
      }

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      await User.findByIdAndUpdate(id, {
        name,
        username,
        email,
        password
      });

      res.status(200).json({success: 'info updated'})
    } catch (e) {
      console.log("error: ", e);
    }
  });
};
