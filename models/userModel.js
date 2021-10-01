const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//crear schema y modelo
const UserSchema = new Schema({
    nombre: String,
    apellido: String
})

const User = mongoose.model('user', UserSchema);

module.exports = User;