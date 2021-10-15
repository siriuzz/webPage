const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = (app) => {
  //renderiza la pagina de users al ir a esa direccion
  app.get("/users", async (req, res) => {
    res.render("users.ejs", { title: "Users" });
  });

  app.get("/get-users", checkToken, async (req, res) => {
    const findAllUsers = await User.find();

    res.status(200).json({
      title: "Users",
      users: findAllUsers
    });
  });

  app.delete("/users/:_id", async (req, res) => {
    const _id = req.body._id;

    await User.deleteOne({ _id: _id });
    res.status(200).json({ result: "user deleted" });
  });

  app.put("/edit-user", async (req, res) => {
    console.log(req.body)
    const findAndUpdate = await User.findByIdAndUpdate(req.body._id, {
      _id: req.body._id,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email
    });
    console.log('xd')
    res.status(200).json({ result: "user updated", updatedUser: findAndUpdate });
  });

  app.post("/edit-users", (req, res) => {
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
  });
};

const checkToken = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (typeof headers !== "undefined") {
    const bearer = headers.split(" ");
    const token = bearer[1];

    req.token = token;

    jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, authData) => {
        if (err) {
          console.log("ERROR: Could not connect to the protected route");
          res.sendStatus(403);
        } else {
          // res.json({
          //   message: "Successful log in",
          //   authData
          // });
          // console.log(authData);
          // console.log("SUCCESS: Connected to protected route");

          next();
        }
      }
    );
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};
