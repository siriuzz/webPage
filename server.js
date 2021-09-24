const express = require("express");
const app = express();
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join())
  res.end();
});

app.listen(3000, () => console.log("server on port 3000"));
