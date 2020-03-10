const mongoose = require("mongoose");

const schemaAdmin = new mongoose.Schema({
    user: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    admin: true
});


const newAdmin = mongoose.model("Admin", schemaAdmin);

module.exports = newAdmin;