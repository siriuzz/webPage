function saveAccount(){
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