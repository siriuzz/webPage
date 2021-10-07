module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
  });

  app.post("/", (req, res) => {
    res.render("index", { title: "Home" });
  });

  app.get("/about", (req, res) => {
    res.render("about", {title: 'About'});
  });
};
