const User = require("../models/userModel");

module.exports = (app) => {

  app.get('/profile', (req, res) => {
    res.render("profile", {title: 'Profile'});
  });

  app.delete("/profile", async (req, res) => {
    try {
      const username = req.body.username;
      await User.deleteOne({ username: username });

      res.status(200).json({ result: "account deleted"})
    } catch (e) {
      console.log(e);
    }
  });
};
