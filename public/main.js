function confirmation() {
  const returnLink = document.createElement("a");
  returnLink.classList.add("m-auto");
  returnLink.innerHTML = "<- Volver a la pagina anterior";

  const contactFormTitle = document.getElementById("contact-form-title");
  const contactForm = document.getElementById("contact-form");

  contactFormTitle.innerHTML = "MENSAJE ENVIADO";
  contactForm.remove();

  returnLink.href = "/contact";
  contactFormTitle.after(returnLink);
}

function userDisplay() {
  var strNombre = document.getElementById("nombre").value;
  var strApellido = document.getElementById("apellido").value;

  if (strNombre && strApellido) {
    document.getElementById("user-title").textContent =
      "USUARIO CREADO: " + strNombre;
  }
}

(function dynamicTitle() {
  let title = document.getElementById("title");
  switch (window.location.pathname) {
    case "/about":
      title.innerHTML = `${title.innerText} | ABOUT`;
      break;

    case "/contact":
      title.innerHTML = `${title.innerText} | CONTACT`;
      break;

    case "/users":
      title.innerHTML = `${title.innerText} | USERS`;
      break;

    case "/":
      title.innerHTML = `${title.innerText} | HOME`;
  }
})();

function sendData() {
  event.preventDefault();
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

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/users");

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer dfgsd");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      console.log("status", xhr.status);
    }
  };

  const info = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
  };

  xhr.send(JSON.parse(info)); 
}
