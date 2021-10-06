const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('profile');
});

router.post('/', (req, res) => {
})

module.exports = router;