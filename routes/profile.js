const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = (app) => {
  app.get("/profile", (req, res) => {
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
};
