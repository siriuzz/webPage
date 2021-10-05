const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/userModel");
const expressLayouts = require("express-ejs-layouts");


router.get("/", (req, res) => {
  res.render("register.ejs", {layout:'layouts/noNavbar.ejs'});
});

module.exports = router;
