const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    value: String,
    label: String
});

const Role = mongoose.model('roles', roleSchema);

module.exports = Role;