//confirma que el mensaje se envio correctamente
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

//cambia el dom al subir un usuario a la db
function userDisplay() {
  var strNombre = document.getElementById("nombre").value;
  var strApellido = document.getElementById("apellido").value;

  if (strNombre && strApellido) {
    document.getElementById("user-title").textContent =
      "USUARIO CREADO: " + strNombre;
  }
}

async function sendData() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/users");

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      console.log("status", xhr.status);
    }
  };

  const info = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
  };

  xhr.send(JSON.stringify(info));
  console.log(window.location.href);
  setTimeout(() => {
    window.location.pathname = "/users";
  }, 2000);

  // forma alternativa de mandar info con fetch api
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
}

(function dynamicTitle() {
  let title = document.getElementById("title");
  switch (window.location.pathname) {
    case "/about":
      title.innerHTML = `${title.innerText} | ABOUT`;
      document.title = "About";
      break;

    case "/users":
      title.innerHTML = `${title.innerText} | USERS`;
      break;

    case "/":
      title.innerHTML = `${title.innerText} | HOME`;
      document.title = "Home";
  }
})();

(function isLogged() {
  if (localStorage.getItem("username") === null && window.location.pathname !== '/register') {
    window.location.href = '/register'
  }
})();
