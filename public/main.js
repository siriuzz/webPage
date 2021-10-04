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

    case '/':
      title.innerHTML = `${title.innerText} | HOME`;

  }
})();

function cambio() {
  var strText = document.getElementById("nombre").value;
  if (strText && document.getElementById('apellido').value) {
    document.getElementById('users-form-title').textContent = 'USUARIO CREADO: ' + strText;
  }
}

// function sendData() {
  // event.preventDefault();
  // const url = '/users';
  // const data = {
  //   "nombre": document.getElementById('nombre').value,
  //   "apellido": document.getElementById('apellido').value
  // };

  // fetch(url,{
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data)
  // })  
  // .then(response => {
  //   response.json();
  //   if(response.status == 200){
  //     window.location = '/'
  //     console.log('if')
  //   }
  // })
  // .catch(error=> {
  //   console.log('Error:', error)
  // });

// }