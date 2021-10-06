module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("index", { usuario: req.body.nombre || "" });
  });

  app.post("/", (req, res) => {
    res.render("index", { usuario: req.body.nombre });
    console.log(req.body.nombre);
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });
};
