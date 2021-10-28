//creacion de app y config
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("layout", "./layouts/layout.ejs");
app.set("view engine", "ejs");

require("./routes")(app);

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/accounts", function (error) {
  if (error) {
    console.log("Error!" + error);
  }
});

//send data mongoose
mongoose.connection
.once("open", () => {
  console.log("Connected");
})
.on("error", (error) => {
  console.log("Error:", error);
  result = "Fallo al conectar con DB";
});

app.listen(3000, () => console.log("server on port 3000"));