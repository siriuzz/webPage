function httpRequest(method, url, data, callback) {
  if (method == "GET") {
    superagent
      .get(url)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(callback);
  } else if (method == "POST") {
    superagent
      .post(url)
      .send(data) // sends a JSON post body
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(callback);
  } else if (method == "DELETE") {
    superagent
      .del(url)
      .send(data) // sends a JSON post body
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(callback);
  }
}

function saveAccount() {
  localStorage.setItem(
    "account",
    JSON.stringify({
      name: document.getElementById("name").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  );
}

(function isLogged() {
  if (window.location.pathname == "/users") {
    // event.preventDefault();
    const accessToken = JSON.parse(localStorage.getItem("tokens")).accessToken;
    const refreshToken = JSON.parse(
      localStorage.getItem("tokens")
    ).refreshToken;

    const callback = (err, res) => {
      if (err) {
        console.log("status", res.xhr.status);
      } else {
        console.log("status", res.xhr.status);
        const usersList = JSON.parse(res.xhr.response).users;

        fillData(usersList);
      }
    };

    superagent
      .get("/get-users")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + accessToken)
      .end(callback);
  }
})();

function fillData(users) {
  const tableBody = document.getElementById("tableBody");

  users.forEach((user, i) => {
    //creacion
    //row
    const tableRow = document.createElement("tr");

    //conteo de usuarios
    const tableHeaderIndex = document.createElement("th");
    tableHeaderIndex.scope = "row";
    tableHeaderIndex.innerHTML = i + 1;

    //name
    const tableDataName = document.createElement("td");
    tableDataName.innerHTML = user.name;

    //username
    const tableDataUsername = document.createElement("td");
    tableDataUsername.innerHTML = user.username;

    //email
    const tableDataEmail = document.createElement("td");
    tableDataEmail.innerHTML = user.email;

    //buttons
    const tableDataButtons = document.createElement("td");

    const unorderedListButtons = document.createElement("ul");
    unorderedListButtons.classList.add("list-inline");
    unorderedListButtons.classList.add("m-0");

    const listItemEdit = document.createElement("li");
    listItemEdit.classList.add("list-inline-item");

    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add("btn");
    buttonEdit.classList.add("btn-success");
    buttonEdit.classList.add("btn-sm");
    buttonEdit.classList.add("rounded-0");
    buttonEdit.type = "button";
    buttonEdit.setAttribute("data-toggle", "tooltip");
    buttonEdit.setAttribute("data-placement", "top");
    buttonEdit.title = "Edit";

    const iconEdit = document.createElement("i");
    iconEdit.classList.add("bi");
    iconEdit.classList.add("bi-pencil");

    const listItemDelete = document.createElement("li");
    listItemDelete.classList.add("list-inline-item");

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("btn");
    buttonDelete.classList.add("btn-danger");
    buttonDelete.classList.add("btn-sm");
    buttonDelete.classList.add("rounded-0");
    buttonDelete.type = "button";
    buttonDelete.setAttribute("data-toggle", "tooltip");
    buttonDelete.setAttribute("data-placement", "top");
    buttonDelete.title = "Delete";

    const iconDelete = document.createElement("i");
    iconDelete.classList.add("bi");
    iconDelete.classList.add("bi-trash");

    //buttons structure
    tableDataButtons.insertAdjacentElement("beforeend", unorderedListButtons);

    unorderedListButtons.insertAdjacentElement("beforeend", listItemEdit);
    listItemEdit.insertAdjacentElement("beforeend", buttonEdit);
    buttonEdit.insertAdjacentElement("beforeend", iconEdit);

    unorderedListButtons.insertAdjacentElement("beforeend", listItemDelete);
    listItemDelete.insertAdjacentElement("beforeend", buttonDelete);
    buttonDelete.insertAdjacentElement("beforeend", iconDelete);

    //insertion
    tableBody.insertAdjacentElement("beforeend", tableRow);
    tableRow.insertAdjacentElement("beforeend", tableHeaderIndex);
    tableRow.insertAdjacentElement("beforeend", tableDataName);
    tableRow.insertAdjacentElement("beforeend", tableDataUsername);
    tableRow.insertAdjacentElement("beforeend", tableDataEmail);
    tableRow.insertAdjacentElement("beforeend", tableDataButtons);
  });
}

//users buttons
function editUser() {
  event.preventDefault();

  const callback = (err, res) => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("status", res.statusCode);
    }
  };
  // httpRequest('POST', '/edit-user', )
}

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
    const callback = (err, res) => {
      if (err) {
        const error = JSON.parse(res.xhr.response).error;
        error.forEach((e) => {
          document.getElementById(e.field).classList.remove("d-none");
          document.getElementById(e.field).innerHTML = e.text;
        });
      } else {
        console.log("status", res.statusCode);
        document.getElementById("register-title").innerHTML =
          "Cuenta creada exitosamente";

        saveAccount();

        setTimeout(() => {
          window.location = "/";
        }, 2500);
      }
    };

    const info = JSON.stringify({
      name: document.getElementById("name").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    });

    httpRequest("POST", "/register", info, callback);
  }
}

function sendLoginData() {
  event.preventDefault();

  const invalidUser = document.getElementById("invalid-user");

  invalidUser.style.display = "d-none";

  const data = JSON.stringify({
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  });

  const callback = (err, res) => {
    // Calling the end function will send the request
    if (err) {
      invalidUser.classList.remove("d-none");
    } else {
      localStorage.setItem(
        "account",
        JSON.stringify({
          username: document.getElementById("username").value,
          password: document.getElementById("password").value
        })
      );

      localStorage.setItem(
        "tokens",
        JSON.stringify({
          accessToken: JSON.parse(res.text).accessToken,
          refreshToken: JSON.parse(res.text).refreshToken
        })
      );

      setTimeout(() => {
        window.location = "/users";
      }, 1500);
    }
  };

  httpRequest("POST", "/login", data, callback);
}

function eraseAccount() {
  event.preventDefault();

  if (localStorage.getItem("account")) {
    const callback = (err, res) => {
      if (err) {
        console.log(err);
      } else {
        localStorage.removeItem("account");
        localStorage.removeItem("tokens");
      }
    };

    const data = {
      username: JSON.parse(localStorage.getItem("account")).username
    };

    httpRequest("DELETE", "/profile", data, callback);
  }
}

function logOut() {
  localStorage.removeItem("account");
  localStorage.removeItem("tokens");
  window.location.pathname = "/login";
}

if (localStorage.getItem("account")) {
  const loginButton = document.getElementById("login-button");
  const registerButton = document.getElementById("register-button");

  loginButton.classList.add("d-none");
  registerButton.classList.add("d-none");
} else if (
  !localStorage.getItem("account") &&
  window.location.pathname != "/register" &&
  window.location.pathname != "/login"
) {
  window.location.pathname = "/register";
}

// if (window.location.pathname == "/users") {
//   window.onload = function userTable() {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", "/users");

//     xhr.setRequestHeader("Accept", "application/json");
//     xhr.setRequestHeader("Content-Type", "application/json");

//     xhr.onreadystatechange = () => {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//       }
//     };
//   };
// }

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
