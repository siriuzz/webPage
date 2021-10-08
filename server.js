//creacion de app y config
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const User = require("./models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const app = express();

app.use(express.static("public"));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("layout", "./layouts/layout.ejs");
app.set("view engine", "ejs");

require("./routes")(app);

//conexion global db
var result;

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
// // router profile
// const profileRouter = require('./routes/profile');
// app.use('/profile', profileRouter);

// //router register
// const registerRouter = require("./routes/register");
// app.use("/register", registerRouter);

// //router users
// const userRouter = require("./routes/users");
// app.use("/users", userRouter);

// //router contact
// const contactRouter = require("./routes/contact");
// app.use("/contact", contactRouter);

//paginas


//conectar con db mongodb
// const { MongoClient } = require('mongodb');

// async function main() {

//     const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

//     const client = new MongoClient(uri);

//     async function createListing(client, newListing){
//         const result = await client.db('webDB').collection('users').insertOne(newListing);

//         console.log('Listing created');
//     }

//     try {

//         await client.connect();

//         await createListing(client, {
//             name:'Pepito',
//             apellido: 'Sanchez'
//         });

//     } catch(e) {
//         console.error(e);
//     } finally{
//         await client.close();
//     }
// }

// main().catch(console.error)

// async function listDatabases(client){
//     const dbList = await client.db().admin().listDatabases();

//     console.log('Databases: ')
//     dbList.databases.forEach(db => {
//         console.log(`- ${db.name}`)
//     });
// }


