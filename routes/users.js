const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.render('users.ejs');
})


router.post('/', change, (req, res) => {
    res.render('users.ejs', { nombre: req.body.nombre });
    console.log(req.body.nombre)
})

function change(req, res, next) {

    const returnLink = document.createElement('a');
    returnLink.id = 'return-link'
    returnLink.innerHTML = "<- Volver a la pagina anterior";

    // contact
    if (window.location.pathname === '/contact') {
        const contactFormTitle = document.getElementById('contact-form-title');
        const contactForm = document.getElementById('contact-form');

        contactFormTitle.innerHTML = 'MENSAJE ENVIADO';
        contactForm.remove();

        returnLink.href = '/contact'
        contactFormTitle.after(returnLink);

    } else if (window.location.pathname === '/users') { //users
        const usersFormTitle = document.getElementById('users-form-title');
        const usersForm = document.getElementById('users-form');
        const nombre = { nombre };


        usersFormTitle.innerHTML = 'CREADO USUARIO: ' + nombre;
        usersForm.remove();

        returnLink.href = '/users'
        usersFormTitle.after(returnLink);
    }

    next();
}

module.exports = router;