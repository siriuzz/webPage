const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, '..','public','contact.html'))
})

router.get("/new", (req, res) => {
    res.send('Formulario de usuarios');
})

router.post("/", (req, res) => {
    // console.log(req.body.nombre, req.body.email);
    
})

module.exports = router