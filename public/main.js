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
      .send(data)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(callback);
  } else if (method == "PUT") {
    superagent
      .put(url)
      .send(data)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(callback);
  } else if (method == "DELETE") {
    superagent
      .del(url)
      .send(data)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(callback);
  }
}

function saveAccount() {
  localStorage.setItem(
    "account",
    JSON.stringify({
      username: document.getElementById("username").value
    })
  );
}

(function isLogged() {
  if (window.location.pathname == "/users" && localStorage.getItem("token")) {
    // event.preventDefault();
    const accessToken = JSON.parse(localStorage.getItem("token")).accessToken;

    const callback = (err, res) => {
      if (err) {
        console.log("status", res.xhr.status);
      } else {
        console.log("status", res.xhr.status);
        const usersList = JSON.parse(res.xhr.response).users;

        fillData(usersList);
        const createUserButton = document.getElementById("create-user-button");
        createUserButton.classList.remove("d-none");
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

function editUser(user) {
  if (user) {
    const row = document.getElementById(user._id);
    const html = `
    <form action="/edit-user">
  <th id="index" scope="row">${user.index}</th>
  <td id="_id-input">${user._id}</td>
  <td>
    <input
      id="name-input"
      type="text"
      class="form-control"
      placeholder="Insert new Name"
      value="${user.name}"
      required
    />
  </td>
  <td>
    <input
      id="username-input"
      type="text"
      class="form-control"
      placeholder="Insert new Username"
      value="${user.username}"
      required
    />
  </td>
  <td>
    <input
      id="email-input"
      type="email"
      class="form-control"
      placeholder="Insert new Email"
      value="${user.email}"
      required
    />
  </td>
  <td>
    <ul class="list-inline m-0">
      <li class="list-inline-item">
        <button
          class="btn btn-success btn-sm rounded-0"
          type="submit"
          onclick="editUser();"
          title="Edit"
        >
          <i class="bi bi-check-lg"></i>
        </button>
      </li>
      <li class="list-inline-item">
        <button
          class="btn btn-danger btn-sm rounded-0"
          type="button"
          title="Cancel"
          onclick="cancelEdit()"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </li>
    </ul>
  </td>
</form>`;
    row.innerHTML = html;
  } else {
    const callback = (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const { index, _id, name, username, email } = JSON.parse(res.text);

        const editedRow = convertRow(index, _id, name, username, email);

        const row = document.getElementById(_id);
        row.innerHTML = editedRow;
      }
    };
    const data = {
      index: document.getElementById("index").innerHTML,
      _id: document.getElementById("_id-input").innerHTML,
      name: document.getElementById("name-input").value,
      username: document.getElementById("username-input").value,
      email: document.getElementById("email-input").value
    };

    httpRequest("PUT", "/edit-user", data, callback);
  }
}

function cancelEdit() {
  const accessToken = JSON.parse(localStorage.getItem("token")).accessToken;

  const callback = (err, res) => {
    if (err) {
      console.log("status", res.xhr.status);
    } else {
      console.log("status", res.xhr.status);
      const usersList = JSON.parse(res.xhr.response).users;

      document.getElementById("tableBody").innerHTML = fillData(usersList);
      const createUserButton = document.getElementById("create-user-button");
      createUserButton.classList.remove("d-none");
    }
  };

  superagent
    .get("/get-users")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .set("Authorization", "Bearer " + accessToken)
    .end(callback);

  httpRequest("GET", "/get-users", data, callback);
}

function convertRow(index, id, name, username, email) {
  return `
<tr id="${id}">
  <th id='index' scope="row">${index}</th>
  <td>${id}</td>
  <td>${name}</td>
  <td>${username}</td>
  <td>${email}</td>
  <td>
    <ul class="list-inline m-0">
      <li class="list-inline-item">
        <button
          class="btn btn-success btn-sm rounded-0"
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Edit"
          onclick="() => editUser(userInfo)"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </li>
      <li class="list-inline-item">
        <button
          class="btn btn-danger btn-sm rounded-0"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          title="Delete"
          onclick="cancelEdit()"
        >
          <i class="bi bi-trash"></i>
        </button>
      </li>
    </ul>
  </td>
</tr>`;
}

function deleteUser(id) {
  // console.log(event.target);
  if (id) {
    const createUserModal = document.getElementById("deleteModal");
    createUserModal.setAttribute("row-id", id);
  } else {
    const modal = document.getElementById("deleteModal");
    const rowId = modal.getAttribute("row-id");

    const callback = (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const row = document.getElementById(rowId);
        row.remove();

        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();
      }
    };

    const data = {
      _id: rowId
    };

    httpRequest("DELETE", "/users/:_id", data, callback);
  }
}

function fillData(users) {
  const tableBody = document.getElementById("tableBody");
  users.forEach((user, index) => {
    //creacion
    //row
    const tableRow = document.createElement("tr");
    tableRow.id = user._id;
    // tableRow.className = "d-flex flex-row";

    //conteo de usuarios
    const tableHeaderIndex = document.createElement("th");
    tableHeaderIndex.scope = "row";
    if (users.length != 1) {
      tableHeaderIndex.innerHTML = index + 1;
    } else {
      tableHeaderIndex.innerHTML = tableBody.childElementCount + 1;
    }

    //id
    const tableHeaderId = document.createElement("td");
    tableHeaderId.innerHTML = user._id;

    //row index
    //name
    const tableDataName = document.createElement("td");
    tableDataName.innerHTML = user.name;

    //username
    const tableDataUsername = document.createElement("td");
    tableDataUsername.innerHTML = user.username;

    //email
    const tableDataEmail = document.createElement("td");
    tableDataEmail.innerHTML = user.email;

    const userInfo = {
      index: tableHeaderIndex.innerHTML,
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email
    };

    
    //buttons
    const tableDataButtons = document.createElement("td");
    
    const unorderedListButtons = document.createElement("ul");
    unorderedListButtons.className = "list-inline m-0";
    
    const listItemEdit = document.createElement("li");
    listItemEdit.className = "list-inline-item";
    
    const buttonEdit = document.createElement("button");
    buttonEdit.className = "btn btn-success btn-sm rounded-0";
    buttonEdit.type = "button";
    buttonEdit.setAttribute("data-toggle", "tooltip");
    buttonEdit.setAttribute("data-placement", "top");
    buttonEdit.title = "Edit";
    buttonEdit.onclick = () => editUser(userInfo);
    
    const iconEdit = document.createElement("i");
    iconEdit.className = "bi bi-pencil";
    
    const listItemDelete = document.createElement("li");
    listItemDelete.className = "list-inline-item";
    
    const buttonDelete = document.createElement("button");
    buttonDelete.className = "btn btn-danger btn-sm rounded-0";
    buttonDelete.type = "button";
    buttonDelete.setAttribute("data-bs-toggle", "modal");
    buttonDelete.setAttribute("data-bs-target", "#deleteModal");
    buttonDelete.addEventListener("click", () =>
      deleteUser(tableHeaderId.innerHTML)
    );
    buttonDelete.title = "Delete";

    const iconDelete = document.createElement("i");
    iconDelete.className = "bi bi-trash";

    //buttons structure
    const editButtonArray = [
      tableDataButtons,
      unorderedListButtons,
      listItemEdit,
      buttonEdit,
      iconEdit
    ];
    const deleteButtonArray = [
      tableDataButtons,
      unorderedListButtons,
      listItemDelete,
      buttonDelete,
      iconDelete
    ];

    editButtonArray.reduce((acc, cur) => {
      acc.insertAdjacentElement("beforeend", cur);
      return cur;
    });

    deleteButtonArray.reduce((acc, cur) => {
      acc.insertAdjacentElement("beforeend", cur);
      return cur;
    });

    //insertion
    tableBody.insertAdjacentElement("beforeend", tableRow);
    tableRow.insertAdjacentElement("beforeend", tableHeaderIndex);
    const tableRowArray = [
      tableHeaderIndex,
      tableHeaderId,
      tableDataName,
      tableDataUsername,
      tableDataEmail,
      tableDataButtons
    ];

    tableRowArray.reduce((acc, cur) => {
      tableRow.insertAdjacentElement("beforeend", cur);
    });
  });
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
        console.log(res);
        const error = JSON.parse(res.xhr.response).error;
        error.forEach((e) => {
          document.getElementById(e.field).classList.remove("d-none");
          document.getElementById(e.field).innerHTML = e.text;
        });
      } else {
        console.log("status", res.statusCode);
        if (window.location.pathname == "/register") {
          document.getElementById("register-title").innerHTML =
            "Cuenta creada exitosamente";

          localStorage.setItem(
            "token",
            JSON.stringify({
              accessToken: JSON.parse(res.text).accessToken
            })
          );

          setTimeout(() => {
            window.location = "/";
          }, 2500);
        } else if (window.location.pathname == "/users") {
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("createModal")
          );
          modal.hide();

          //agrega nueva fila al crear usuario
          const user = [
            {
              _id: JSON.parse(res.text)._id,
              name: JSON.parse(res.text).name,
              username: JSON.parse(res.text).username,
              email: JSON.parse(res.text).email
            }
          ];
          fillData(user);
        }

        saveAccount();
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

  invalidUser.classList.add = "d-none";

  const data = JSON.stringify({
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  });

  const callback = (err, res) => {
    // Calling the end function will send the request
    if (err) {
      invalidUser.classList.remove("d-none");
    } else {
      saveAccount();

      localStorage.setItem(
        "token",
        JSON.stringify({
          accessToken: JSON.parse(res.text).accessToken
        })
      );

      setTimeout(() => {
        window.location = "/users";
      }, 1500);
    }
  };

  httpRequest("POST", "/login", data, callback);
}

function deleteAccount() {
  if (localStorage.getItem("account")) {
    const callback = (err, res) => {
      if (err) {
        console.log(err);
      } else {
        localStorage.removeItem("account");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.pathname = "/register";
        }, 1000);
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
  localStorage.removeItem("token");
  window.location.pathname = "/login";
}

// if (
//   localStorage.getItem("account") &&
//   window.location.pathname != "/register"
// ) {
//   const loginButton = document.getElementById("login-button");
//   const registerButton = document.getElementById("register-button");

//   loginButton.classList.add("d-none");
//   registerButton.classList.add("d-none");
// } else if (
//   !localStorage.getItem("account") &&
//   window.location.pathname != "/register" &&
//   window.location.pathname != "/login"
// ) {
//   logOut();
//   window.location.pathname = "/register";
// }

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
