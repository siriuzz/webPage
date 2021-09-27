const express = require("express");
const app = express();
const path = require('path');

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("view engine", "ejs");

app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'))
})

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);

app.listen(3000, () => console.log("server on port 3000"));
