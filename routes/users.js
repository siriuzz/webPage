const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json())

router.get('/', (req, res) => {
    res.render('users.ejs');
})


router.post('/', (req, res) => {
    // res.render('users.ejs', { nombre: req.body.nombre });
    // console.log(req.body.nombre)
    // res.render('contact.ejs');
    console.log('funciona')
    res.status(200).json(req.body);
})


module.exports = router;