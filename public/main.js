function change() {

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
    const nombreValue = document.getElementById('nombre').value;

    usersFormTitle.innerHTML = nombreValue;
    usersForm.remove();

    returnLink.href = '/users'
    usersFormTitle.after(returnLink);
  }

}



(function dynamicTitle() {
  let title = document.getElementById('title');
  switch (window.location.pathname) {
    case '/about':
      title.innerHTML = `${title.innerText} | ABOUT`;
      break;

    case '/contact':
      title.innerHTML = `${title.innerText} | CONTACT`;
      break;

    case '/users':
      title.innerHTML = `${title.innerText} | USERS`;
      break;

    default:
      title.innerHTML = `${title.innerText} | HOME`;

  }
})();

function cambio() {
  var strText = document.getElementById("nombre").value;
  if (strText && document.getElementById('apellido').value) {
    document.getElementById('users-form-title').textContent = 'USUARIO CREADO: ' + strText;
  }
}

function sendData() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/users')

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer dfgsd");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      console.log('status', xhr.status);
    }
  }

  const info = {
    "nombre": document.getElementById('nombre').value,
    "apellido": document.getElementById('apellido').value
  };

  xhr.send(info);

  // setTimeout(function () {
  //   window.location.href = 'users';
  // }, 2000)
}