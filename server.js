const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");




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

//creacion de app y config

const app = express();
const path = require('path');

app.use(express.static("public"))
app.use(expressLayouts);
app.set('layout', './layouts/layout.ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set("view engine", "ejs");


//paginas
app.get('/', (req, res) => {
    res.render('index', { usuario: req.body.nombre || '' });

})

app.post('/', (req, res) => {
    res.render('index', { usuario: req.body.nombre });
    console.log(req.body.nombre);
})

app.get('/about', (req, res) => {
    res.render('about');
})

//routers
const userRouter = require('./routes/users');
app.use('/users', userRouter);

const contactRouter = require('./routes/contact');
const e = require("express");
app.use('/contact', contactRouter);



app.listen(3000, () => console.log("server on port 3000"));
