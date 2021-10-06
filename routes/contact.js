const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("contact.ejs");
});

router.get("/new", (req, res) => {
  res.send("Formulario de usuarios");
});

router.post("/", (req, res) => {
  res.render("contact");
  console.log(req.body.nombre, req.body.email);
});

