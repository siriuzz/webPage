const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const main = require("../server");
const User = require("../models/userModel");

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.render("users.ejs");
});

router.post("/", (req, res) => {
  //send data mongodb
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
  const mongoose = require("mongoose");
  mongoose.Promise = global.Promise;
  
  mongoose.connect(
      "mongodb://localhost/users",
      { useNewUrlParser: true },
      function (error) {
          if (error) {
              console.log("Error!" + error);
            }
        }
        );
        
        //send data mongoose
        mongoose.connection
        .once("open", () => {
            console.log("Connected");
            
            const newUser = new User({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
            });
            
            newUser.save((err, data) => {
                if (err) {
                    console.log(error);
                } else {
                    setTimeout(() => {
                        res.render('users'); 
                    }, 3000);
                }
      });
    })
    .on("error", (error) => {
      console.log("Error:", error);
    });

});

module.exports = router;
