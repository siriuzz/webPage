const User = require("../models/userModel");
const Role = require("../models/roleModel");
const { checkToken } = require("../public/auth");

module.exports = (app) => {
  //renderiza la pagina de users al ir a esa direccion

  app.get("/users", checkToken, async (req, res) => {
    res.render("users.ejs", { title: "Users" });
  });

  app.get("/get-users", async (req, res) => {
    try {
      const findAllUsers = await User.find().populate({
        path: "role",
        select: "value label"
      });

      res.status(200).json({
        title: "Users",
        users: findAllUsers
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.delete("/users/:_id", async (req, res) => {
    const _id = req.body._id;

    await User.deleteOne({ _id: _id });
    res.status(200).json({ result: "user deleted" });
  });

  app.put("/edit-user", async (req, res) => {
    const { index, _id, name, username, email, role } = req.body;
    console.log(role);

    const myUser = await User.findOne({ _id: _id });
    const findUsername = await User.findOne({ username: username });
    const findEmail = await User.findOne({ email: email });
    const findRole = await Role.findOne({ label: role });

    const editedUserInfo = {
      index,
      _id,
      name,
      username,
      email,
      role: findRole.label
    };

    if (myUser.username !== username && myUser.email !== email) {
      if (findUsername && findEmail) {
        return res.status(500).json([
          {
            field: "edit-username",
            text: "Username taken"
          },
          {
            field: "edit-email",
            text: "Email already taken"
          }
        ]);
      }
    }

    if (myUser.username !== username) {
      if (findUsername) {
        return res.status(500).json([
          {
            field: "edit-username",
            text: "Username taken"
          }
        ]);
      }
    }

    if (myUser.email !== email) {
      if (findEmail) {
        return res.status(500).json([
          {
            field: "edit-email",
            text: "Email already taken"
          }
        ]);
      }
    }

    await User.findByIdAndUpdate(_id, {
      name,
      username,
      email,
      role: findRole._id
    });

    res.status(200).json(editedUserInfo);
  });
};
