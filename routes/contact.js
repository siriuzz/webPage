const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.render("contact.ejs");
});

router.get("/new", (req, res) => {
  res.send("Formulario de usuarios");
});

router.post("/", (req, res) => {
  res.render("contact");
//   function change() {
//     const returnLink = document.createElement("a");
//     returnLink.id = "return-link";
//     returnLink.innerHTML = "<- Volver a la pagina anterior";

//     const contactFormTitle = document.getElementById("contact-form-title");
//     const contactForm = document.getElementById("contact-form");

//     contactFormTitle.innerHTML = "MENSAJE ENVIADO";
//     contactForm.remove();

//     returnLink.href = "/contact";
//     contactFormTitle.after(returnLink);
//   }

  console.log(req.body.nombre, req.body.email);
});

module.exports = router;
