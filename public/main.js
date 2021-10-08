(function isLogged() {
  if (
    localStorage.getItem("account") === null &&
    window.location.pathname !== "/register" &&
    window.location.pathname !== "/"
  ) {
    window.location.replace("/register");
  }
})();

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

  const passwordInput = document.getElementById("password");
  const repeatPasswordInput = document.getElementById("repeat-password");

  if (event.target === eye1) {
    if (eye1.classList.contains("fa-eye-slash")) {
      eye1.classList.replace("fa-eye-slash", "fa-eye");

      passwordInput.type = "text";
    } else {
      eye1.classList.replace("fa-eye", "fa-eye-slash");
      passwordInput.type = "password";
    }
  } else {
    if (eye2.classList.contains("fa-eye-slash")) {
      eye2.classList.replace("fa-eye-slash", "fa-eye");
      repeatPasswordInput.type = "text";
    } else {
      eye2.classList.replace("fa-eye", "fa-eye-slash");
      repeatPasswordInput.type = "password";
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

  //errores
  const passwordError = document.getElementById("password-error");
  const invalidPassword = document.getElementById("invalid-password");
  const usernameTaken = document.getElementById("username-taken");
  const emailTaken = document.getElementById("email-taken");

  invalidPassword.classList.add("d-none");
  passwordError.classList.add("d-none");
  usernameTaken.classList.add("d-none");
  emailTaken.classList.add("d-none");

  if (password !== repeatPassword) {
    passwordError.classList.remove("d-none");
  }

  if (password.length < 8) {
    invalidPassword.classList.remove("d-none");
  }

  if (password == repeatPassword && password.length >= 8) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/register");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("status", xhr.status);
        document.getElementById("register-title").innerHTML =
          "Cuenta creada exitosamente";
        setTimeout(() => {
          window.location = "/";
        }, 2500);

        localStorage.setItem(
          "account",
          JSON.stringify({
            name: document.getElementById("name").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
          })
        );
      } else if (xhr.readyState == 4 && xhr.status == 401) {
        const error = JSON.parse(xhr.response).error;
        error.forEach((e) => {
          document.getElementById(e.field).classList.remove("d-none");
          document.getElementById(e.field).innerHTML = e.text;
        });
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

function sendLoginData() {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/login");

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  const invalidUser = document.getElementById("invalid-user");

  invalidUser.style.display = "d-none";

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("status", xhr.status);
      // console.log(JSON.parse(localStorage.token))
      // window.location = "/";
    } else if (xhr.readyState == 4 && xhr.status == 401) {
      invalidUser.classList.remove("d-none");
    }
  };

  const data = JSON.stringify({
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  });

  xhr.send(data);
}

function eraseAccount() {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/profile");

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {

    }
  }

  localStorage.removeItem("account");
  window.location.href = "/register";
}

if (window.location.pathname == "/users") {
  window.onload = function userTable() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/users");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
      }
    };

    console.log(xhr.response);
  };
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
