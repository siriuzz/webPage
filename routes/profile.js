module.exports = (app) => {

  app.get('/profile', (req, res) => {
    res.render("profile", {title: 'Profile'});
  });

  app.post("/profile", (req, res) => {

  });
};
