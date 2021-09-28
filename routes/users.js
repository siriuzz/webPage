const express = require('express');
const router = express.Router();
const path = require('path');

// const usersArray = ['xd'];

router.get('/', (req,res) => {
    res.render('users.ejs')
    res.end();
})

router.post('/', (req,res) => {
    console.log(req.body.nombre)
})

module.exports = router;