const User = require("../models/userModel");

module.exports = (app) => {

  app.get('/profile', (req, res) => {
    res.render("profile", {title: 'Profile'});
  });

  app.post("/profile", async (req, res) => {
    try {
      

      await User.deleteOne({})
    } catch (e) {
      
    }
  });
};
