const User = require("../models/userModel");

module.exports = (app) => {
  app.get("/register", (req, res) => {
    res.render("register", {layout: 'layouts/empty.ejs', title: 'Register'});
  });

  app.post("/register", (req, res) => {
    var result;

    //send data mongoose
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
        console.log("data saved");
        result = "Data saved";
      }
    });

    res.status(200).json({ result: result });
  });
};
