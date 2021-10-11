const jwt = require('jsonwebtoken')
const User = require("../models/userModel");

module.exports = (app) => {
  //renderiza la pagina de users al ir a esa direccion
  app.get("/users",checkToken, async (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
      if (err) {
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        res.json({
          message: "Successful log in",
          authData
          
        });
        console.log("SUCCESS: Connected to protected route");

        const findAllUsers = await User.find();

        res.render("users.ejs", { title: "Users", users: findAllUsers });
      }
    });
  });

  app.post("/users", (req, res) => {


    // send data mongodb
    // (function () {
    // const { MongoClient } = require('mongodb');
    //     async function main() {
    //         const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
    //         const client = new MongoClient(uri);
    //         async function createListing(client, newListing) {
    //             const result = await client.db('webDB').collection('users').insertOne(newListing);
    //             console.log('Listing created');
    //         }
    //         try {
    //             await client.connect();
    //             await createListing(client, {
    //                 name: req.body.nombre,
    //                 apellido: req.body.apellido
    //             });
    //         } catch (e) {
    //             console.error(e);
    //         } finally {
    //             await client.close();
    //         }
    //     }
    //     main()
    // })();
    //conectar con base de datos mongoose
    // const mongoose = require("mongoose");
    // mongoose.Promise = global.Promise;
    // mongoose.connect("mongodb://localhost/webDB", function (error) {
    //   if (error) {
    //     console.log("Error!" + error);
    //   }
    // });
    // //send data mongoose
    // mongoose.connection
    //   .once("open", () => {
    //     console.log("Connected");
    //     const { nombre, apellido } = req.body;
    //     const newUser = new User({
    //       nombre,
    //       apellido,
    //     });
    //     newUser.save((err, data) => {
    //       if (err) {
    //         console.log(error);
    //       }
    //     });
    //   })
    //   .on("error", (error) => {
    //     console.log("Error:", error);
    //   });
    // cambiar titulo de la pagina
    // async function userDisplay() {
    //   const nombre = document.getElementById("nombre").value;
    //   const apellido = document.getElementById("apellido").value;
    // }
  });
};

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  console.log(header);

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};
