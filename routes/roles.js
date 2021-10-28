const Role = require("../models/roleModel");
const { checkToken } = require("../public/auth");

module.exports = (app) => {
  app.get("/get-roles", async (req, res) => {
    try {
      const roles = await Role.find();

      res.status(200).json({
        roles: roles
      });
    } catch (error) {
      res.status(500).json({error: "error getting roles"});
      console.log(error);
    }
  });

  app.post("/create-role", checkToken, async (req, res) => {
    try {
      const { label, value } = req.body;

      const roleExists = await Role.findOne({ $or: [{ label }, { value }] });
      const valueExists = await Role.findOne({ value });
      const labelExists = await Role.findOne({ label });

      if (valueExists && labelExists) {
        return res.status(500).json({
          error: [
            {
              text: "Invalid label",
              field: "role-label-input",
              error: "role-label-error"
            },
            {
              text: "Invalid value",
              field: "role-value-input",
              error: "role-value-error"
            }
          ]
        });
      }

      if (labelExists) {
        return res.status(500).json({
          error: [
            {
              text: "Invalid label",
              field: "role-label-input",
              error: "role-label-error"
            }
          ]
        });
      }

      if (valueExists) {
        return res.status(500).json({
          error: [
            {
              text: "Invalid value",
              field: "role-value-input",
              error: "role-value-error"
            }
          ]
        });
      }

      const newRole = new Role({
        label,
        value
      });

      const newRoleData = await newRole.save();
      res.status(200).json({ role: newRoleData });
    } catch (error) {
      res.status(500).json({
        error: error
      });
    }
  });
};
