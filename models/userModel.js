//imports necesarios para crear un modelo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//crear schema y modelo
const UserSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: { type: String, select: false },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles"
  }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
