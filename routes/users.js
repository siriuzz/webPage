const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.render('users.ejs');
})


router.post('/', (req, res) => {
    res.render('users.ejs', { nombre: req.body.nombre });
    console.log(req.body.nombre)
})

module.exports = router;