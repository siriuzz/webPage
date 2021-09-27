function change(message) {
    const formTitle = document.getElementById('contact-form-title');
    const form = document.getElementById('contact-form');

    formTitle.innerHTML = message;
    form.remove();

    const returnLink = document.createElement('a');
    returnLink.href = '/contact'
    returnLink.id = 'return-link'
    returnLink.innerHTML = "<- Volver a la pagina anterior";
    

    formTitle.after(returnLink);
}

