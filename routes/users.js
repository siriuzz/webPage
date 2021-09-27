const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res) => {
    users.push({ nombre: req.body.nombre})
    res.sendFile(path.join(__dirname, '..','public', 'users.html'))
})

const users = [];

module.exports = router;