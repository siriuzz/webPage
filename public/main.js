

//confirma que el mensaje se envio correctamente
function confirmation() {
  const returnLink = document.createElement("a");
  returnLink.classList.add("m-auto");
  returnLink.innerHTML = "<- Volver a la pagina anterior";
  if (window.location.pathname == "/register") {
    const registerTitle = document.getElementById("register-title").innerHTML;
    const registerForm = document.getElementById("register-form");

    registerTitle = "CUENTA CREADA" + registerTitle.innerText;
    returnLink.href = "/register";

    registerForm.style.display = "hidden";
    registerTitle.after(returnLink);
  }
}

function showPassword() {
  event.preventDefault();
  const eye1 = document.getElementById("eye1");
  const eye2 = document.getElementById("eye2");

  const passwordInput = document.getElementById('password')
  const repeatPasswordInput = document.getElementById('repeat-password')

  if (event.target === eye1) {
    if (eye1.classList.contains("fa-eye-slash")) {
      eye1.classList.add("fa-eye");
      eye1.classList.remove("fa-eye-slash");
      passwordInput.type = 'text';

    } else {
      eye1.classList.add("fa-eye-slash");
      eye1.classList.remove("fa-eye");
      passwordInput.type = 'password';

    }
  } else {
    if (eye2.classList.contains("fa-eye-slash")) {
      eye2.classList.add("fa-eye");
      eye2.classList.remove("fa-eye-slash");
      repeatPasswordInput.type = 'text';

    } else {
      eye2.classList.add("fa-eye-slash");
      eye2.classList.remove("fa-eye");
      repeatPasswordInput.type = 'password';

    }
  }
}

//cambia el dom al subir un usuario a la db
// function userDisplay() {
//   const strName = document.getElementById("name").value;
//   const strEmail = document.getElementById("email").value;

//   if (strName && strEmail) {
//     document.getElementById("register-title").innerHTML =
//       "USUARIO CREADO: " + strName;
//   }
// }

function sendRegisterData() {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeat-password").value;

  if (password !== repeatPassword) {
    const passwordError = document.getElementById("password-error");

    passwordError.classList.remove("d-none");
    passwordError.style.display = "block";

    setTimeout(() => {
      passwordError.classList.add("d-none");
    }, 4000);
  }

  if (password.length < 8) {
    const invalidPassword = document.getElementById("invalid-password");

    invalidPassword.classList.remove("d-none");
    invalidPassword.style.display = "block";

    setTimeout(() => {
      invalidPassword.classList.add("d-none");
    }, 4000);
  }

  // if (db.users.find({ username: document.getElementById("username").value })) {
  //   const usernameTaken = document.getElementById("username-taken");

  //   usernameTaken.classList.remove("d-none");
  //   usernameTaken.style.display = "block";

  //   setTimeout(() => {
  //     usernameTaken.classList.add("d-none");
  //   }, 4000);
  // }

  if (password == repeatPassword && password.length >= 8) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/register");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        console.log("status", xhr.status);
        document.getElementById("register-title").innerHTML =
          "Cuenta creada exitosamente";

        localStorage.setItem(
          "account",
          JSON.stringify({
            name: document.getElementById("name").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
          })
        );
      }
    };

    const info = JSON.stringify({
      name: document.getElementById("name").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    });

    xhr.send(info);
  }

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

// (function dynamicTitle() {
//   let title = document.getElementById("title");
//   switch (window.location.pathname) {
//     case "/about":
//       title.innerHTML = `${title.innerText} | ABOUT`;
//       document.title = "About";
//       break;

//     case "/users":
//       title.innerHTML = `${title.innerText} | USERS`;
//       break;

//     case "/profile":
//       title.innerHTML = `${title.innerText} | PROFILE`;
//       document.title = "Profile";
//       break;

//     case "/":
//       title.innerHTML = `${title.innerText} | HOME`;
//       document.title = "Home";
//   }
// })();

function eraseAccount() {
  localStorage.removeItem("account");
  window.location.href = "/register";
}

(function isLogged() {
  if (
    localStorage.getItem("account") === null &&
    window.location.pathname !== "/register"
  ) {
    window.location.href = "/register";
  }
  // console.log(JSON.parse(localStorage.getItem("account")).name);
})();
