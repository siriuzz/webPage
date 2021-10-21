//imports necesarios para crear un modelo
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//crear schema y modelo
const UserSchema = new Schema({
    name        : String,
    username    : String,
    email       : String,
    password    : String,
    role        : String
})

const User = mongoose.model('users', UserSchema);

module.exports = User;