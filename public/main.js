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

const cookie = document.cookie;
const token = cookie.replace("accessToken=", "");

function saveAccount() {
  localStorage.setItem(
    "account",
    JSON.stringify({
      username: document.getElementById("username").value
    })
  );
}

(function isLogged() {
  if (token && window.location.pathname == "/users") {
    const callback = (err, res) => {
      if (err) {
        console.log("status", res.xhr.status);
      } else {
        console.log("status", res.xhr.status);
        const usersList = JSON.parse(res.text).users;

        fillData(usersList);
        const createUserButton = document.getElementById("create-user-button");
        const createRoleButton = document.getElementById("create-role-button");
        createUserButton.classList.remove("d-none");
        createRoleButton.classList.remove("d-none");
      }
    };

    superagent
      .get("/get-users")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(callback);
  } else if (token && window.location.pathname == "/profile") {
    const callback = (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const user = JSON.parse(res.text).user;
        profileTable(user);
      }
    };

    const data = {
      token: token
    };

    superagent
      .get("/get-profile")
      .send(data)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(callback);
  }
})();

function createRole() {
  event.preventDefault();

  const roleLabelInput = document.getElementById("role-label-input");
  const roleValueInput = document.getElementById("role-value-input");

  roleLabelInput.classList.remove("is-invalid");
  roleValueInput.classList.remove("is-invalid");

  const roleLabelError = document.getElementById("role-label-error");
  const roleValueError = document.getElementById("role-value-error");

  if (roleLabelInput.value == "") {
    roleLabelInput.classList.add("is-invalid");
    roleLabelError.innerHTML = "Please fill out this field.";
    return;
  } else if (roleValueInput.value == "") {
    roleValueInput.classList.add("is-invalid");
    roleValueError.innerHTML = "Please fill out this field.";

    return;
  }

  const callback = (err, res) => {
    if (err) {
      const error = JSON.parse(res.text).error;
      error.forEach((e) => {
        document.getElementById(e.field).classList.add("is-invalid");
        document.getElementById(e.error).innerHTML = e.text;
      });
    } else {
      const roleModal = document.getElementById("createRoleModal");
      const bsRoleModal = bootstrap.Modal.getInstance(roleModal);
      const roleModalForm = document.querySelector("#createRoleModal form");

      bsRoleModal.hide();
      roleModalForm.reset();
    }
  };

  const data = {
    label: roleLabelInput.value,
    value: roleValueInput.value
  };

  httpRequest("POST", "/create-role", data, callback);
}

(function populateSelect() {
  if (window.location.pathname == "/users") {
    const callback = (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const editRoleSelect = document.querySelector("#edit-role");
        const createRoleSelect = document.querySelector("#select-role");

        const roles = JSON.parse(res.text).roles;
        roles.forEach((role) => {
          const element = document.createElement("option");
          element.innerHTML = role.label;

          createRoleSelect.insertAdjacentElement("beforeend", element);
        });

        roles.forEach((role) => {
          const element = document.createElement("option");
          element.innerHTML = role.label;

          editRoleSelect.insertAdjacentElement("beforeend", element);
        });
      }
    };

    superagent
      .get("/get-roles")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(callback);
  }
})();

const editName = document.getElementById("edit-name");
const editUsername = document.getElementById("edit-username");
const editEmail = document.getElementById("edit-email");

function editProfile() {
  event.preventDefault();

  const oldPassword = document.getElementById("old-password");
  const newPassword = document.getElementById("new-password");
  const profileTableChilds = document.getElementById('profileTable').childNodes;
  const id = profileTableChilds[1].childNodes[1];
  console.log(id);

  const callback = (err, res) => {
    if(err){
      console.log(err);
    } else {
      console.log('salio bien')
    }
  }

  const data = {
    id: id,
    name: editName.value,
    username: editUsername.value
  }

  httpRequest('PUT', '/edit-profile', data, callback);
}

function editUser(id) {
  event.preventDefault();

  const selectRole = document.getElementById("edit-role");
  if (id) {
    const modal = document.getElementById("editModal");
    const curRow = document.getElementById(id).childNodes;

    modal.setAttribute("row-id", id);
    editUsername.classList.remove("is-invalid");
    editEmail.classList.remove("is-invalid");

    editName.value = curRow[2].innerHTML;
    editUsername.value = curRow[3].innerHTML;
    editEmail.value = curRow[4].innerHTML;

    switch (curRow[5].innerHTML) {
      case "Super Administrator":
        selectRole.selectedIndex = "0";
        break;
      case "Administrator":
        selectRole.selectedIndex = "1";
        break;
      case "User":
        selectRole.selectedIndex = "2";
        break;
    }
  } else {
    const modal = document.getElementById("editModal");
    const _id = modal.getAttribute("row-id");
    const {
      [0]: index,
      [2]: name,
      [3]: username,
      [4]: email,
      [5]: role
    } = document.getElementById(_id).childNodes;

    const callback = (err, res) => {
      if (err) {
        const error = JSON.parse(res.text);
        error.forEach((e) => {
          const input = document.getElementById(e.field);
          input.classList.add("is-invalid");
        });
      } else {
        const editModal = bootstrap.Modal.getInstance(
          document.getElementById("editModal")
        );
        editModal.hide();
        const newData = JSON.parse(res.text);

        setTimeout(() => {
          index.innerHTML = newData.index;
          document.getElementById(_id).childNodes[1].innerHTML = newData._id;
          name.innerHTML = newData.name;
          username.innerHTML = newData.username;
          email.innerHTML = newData.email;
          role.innerHTML = newData.role;
        }, 400);
      }
    };

    const data = {
      index: index.innerHTML,
      _id: _id,
      name: document.getElementById("edit-name").value,
      username: document.getElementById("edit-username").value,
      email: document.getElementById("edit-email").value,
      role: selectRole.value
    };

    httpRequest("PUT", "/edit-user", data, callback);
  }
}

function deleteUser(id) {
  // console.log(event.target);
  const deleteModal = document.getElementById("deleteModal");
  if (id) {
    deleteModal.setAttribute("row-id", id);
  } else {
    const rowId = deleteModal.getAttribute("row-id");

    const callback = (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const row = document.getElementById(rowId);
        row.remove();

        const bsModal = bootstrap.Modal.getInstance(deleteModal);
        bsModal.hide();
      }
    };

    const data = {
      _id: rowId
    };

    httpRequest("DELETE", "/users/:_id", data, callback);
  }
}

function profileTable(user) {
  const profileDiv = document.getElementById("profile");
  console.log(user);
  profileDiv.innerHTML = `
  <div class="row">
  <div class="col">
    <div class="profile-head">
      <h3>${user.name}</h3>
    </div>
  </div>
  <div class="col-md-2">
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#editModal"
      >Edit Profile
        </button>
  </div>
</div>
<div class="flex-column">
  <div>
    <table class="table w-100 m-auto">
      <tbody id="profileTable">
        <tr>
          <th scope="row">Id</th>
          <td>: ${user._id}</td>
        </tr>
        <tr>
          <th scope="row">Name</th>
          <td>: ${user.name}</td>
        </tr>
        <tr>
          <th scope="row">Username</th>
          <td>: ${user.username}</td>
        </tr>
        <tr>
          <th scope="row">Email</th>
          <td>: ${user.email}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<div class="d-flex justify-content-left align-items-left my-2">
  <button type="button" class="btn btn-danger" onclick="logOut();">
    <i class="bi bi-box-arrow-right"></i>
    <span>LOG OUT</span>
  </button>
</div>
<div class="d-flex justify-content-left align-items-left">
  <button type="button" class="btn btn-danger" onclick="deleteAccount();">
    <i class="bi bi-trash"></i>
    <span>DELETE ACCOUNT</span>
  </button>
</div>`;
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

    //role
    const tableDataRole = document.createElement("td");
    tableDataRole.innerHTML = user.role.label;

    //buttons
    const tableDataButtons = document.createElement("td");

    const unorderedListButtons = document.createElement("ul");
    unorderedListButtons.className = "list-inline m-0";

    const listItemEdit = document.createElement("li");
    listItemEdit.className = "list-inline-item";

    const buttonEdit = document.createElement("button");
    buttonEdit.className = "btn btn-success btn-sm rounded";
    buttonEdit.type = "button";
    buttonEdit.setAttribute("data-bs-toggle", "modal");
    buttonEdit.setAttribute("data-bs-target", "#editModal");
    buttonEdit.title = "Edit";
    buttonEdit.onclick = () => editUser(user._id);

    const iconEdit = document.createElement("i");
    iconEdit.className = "bi bi-pencil";

    const listItemDelete = document.createElement("li");
    listItemDelete.className = "list-inline-item";

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "btn btn-danger btn-sm rounded";
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
      tableDataRole,
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
  
  if(window.location.pathname == '/profile'){
    const eye3 = document.getElementById("eye3");
    const oldPasswordInput = document.getElementById("old-password");

    if(event.target === eye3){
      if(eye3.classList.contains("fa-eye-slash")){
        eye3.className = "fa fa-eye p-2";
        oldPasswordInput.type = 'text';
      } else {
        eye3.className = "fa fa-eye-slash p-2";
        oldPasswordInput.type = "password"
      }
    }
  }

  if (event.target === eye1) {
    if (eye1.classList.contains("fa-eye-slash")) {
      eye1.classList.replace("fa-eye-slash", "fa-eye");

      passwordInput.type = "text";
    } else {
      eye1.classList.replace("fa-eye", "fa-eye-slash");
      passwordInput.type = "password";
    }
  } else if(event.target === eye2) {
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

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("username");
  const password = document.getElementById("password");
  const repeatPassword = document.getElementById("repeat-password");
  const selectRole = document.getElementById("select-role");

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function validateEmail(email) {
    if (emailRegex.test(email.value)) {
      return true;
    } else {
      return false;
    }
  }

  const emailVerification = validateEmail(emailInput);

  //defaults
  nameInput.className = "form-control";
  emailInput.className = "form-control";
  usernameInput.className = "form-control";
  password.className = "form-control";
  repeatPassword.className = "form-control";

  const idArray = ["name", "username", "email", "password", "repeat-password"];
  idArray.forEach((id) => {
    const element = document.getElementById(id);
    if (element.value == "") {
      element.classList.add("is-invalid");
      if (id == "username") {
        document.getElementById("username-error").innerHTML =
          "Please fill out this field";
      } else if (id == "email") {
        document.getElementById("email-error").innerHTML =
          "Please fill out this field";
      }
    }
  });

  const passwordValue = password.value;
  const repeatPasswordValue = repeatPassword.value;

  // errores
  const passwordError = document.getElementById("password-error");
  const invalidPassword = document.getElementById("invalid-password");
  const roleError = document.getElementById("role-error");

  passwordError.className = "d-none";
  invalidPassword.className = "d-none";

  if (passwordValue !== repeatPasswordValue) {
    document.getElementById("repeat-password").classList.add("is-invalid");
    passwordError.className = "invalid-feedback";
  }

  if (passwordValue.length < 8 && passwordValue.length > 0) {
    document.getElementById("password").classList.add("is-invalid");
    document.getElementById("repeat-password").classList.add("is-invalid");
    invalidPassword.className = "invalid-feedback";
  }

  if (selectRole.selectedIndex == "0") {
    selectRole.classList.add("is-invalid");
    roleError.className = "invalid-feedback";
  }

  if (
    passwordValue == repeatPasswordValue &&
    passwordValue.length >= 8 &&
    nameInput != "" &&
    usernameInput != "" &&
    email != "" &&
    emailVerification == true &&
    selectRole.value != ""
  ) {
    const callback = (err, res) => {
      if (err) {
        const error = JSON.parse(res.text).error;
        error.forEach((e) => {
          const input = document.getElementById(e.field);
          const alert = document.getElementById(e.alert);

          input.classList.add("is-invalid");
          alert.className = "invalid-feedback";

          alert.innerHTML = e.text;
        });
      } else {
        console.log("status", res.statusCode);
        if (window.location.pathname == "/register") {
          document.getElementById("register-title").innerHTML =
            "Cuenta creada exitosamente";

          document.cookie = `accessToken=${
            JSON.parse(res.text).accessToken
          };secure`;

          setTimeout(() => {
            window.location = "/";
          }, 2500);
        } else if (window.location.pathname == "/users") {
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("createModal")
          );
          const form = document.querySelector("#createModal form");
          console.log(form);
          modal.hide();
          form.reset();

          //agrega nueva fila al crear usuario
          const user = [
            {
              _id: JSON.parse(res.text)._id,
              name: JSON.parse(res.text).name,
              username: JSON.parse(res.text).username,
              email: JSON.parse(res.text).email,
              role: { label: JSON.parse(res.text).role }
            }
          ];
          console.log(JSON.parse(res.text));
          fillData(user);
        }

        saveAccount();
      }
    };

    const info = JSON.stringify({
      name: nameInput.value,
      username: usernameInput.value,
      email: emailInput.value,
      password: password.value,
      role: selectRole.value
    });

    httpRequest("POST", "/register", info, callback);
  }
}

function sendLoginData() {
  event.preventDefault();

  const username = document.getElementById("username");
  const password = document.getElementById("password");

  username.classList.remove("is-invalid");
  password.classList.remove("is-invalid");

  const data = JSON.stringify({
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  });

  const callback = (err, res) => {
    // Calling the end function will send the request
    if (err) {
      username.classList.add("is-invalid");
      password.classList.add("is-invalid");
    } else {
      saveAccount();
      document.cookie = `accessToken=${
        JSON.parse(res.text).accessToken
      };secure`;

      setTimeout(() => {
        window.location = "/users";
      }, 150);
    }
  };

  httpRequest("POST", "/login", data, callback);
}

function deleteAccount() {
  const token = cookie.split("accessToken=")[1];
  if (token) {
    const callback = (err, res) => {
      if (err) {
        console.log(err);
      } else {
        localStorage.removeItem("account");
        document.cookie =
          "accessToken" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

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
  document.cookie =
    "accessToken" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  window.location.pathname = "/login";
}
