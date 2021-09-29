const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');


const app = express();
const path = require('path');

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

//routers
const userRouter = require('./routes/users');
app.use('/users', userRouter);

const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);



app.listen(3000, () => console.log("server on port 3000"));
