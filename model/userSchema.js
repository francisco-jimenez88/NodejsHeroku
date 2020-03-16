const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    phone: {type: Number},
    address: {
        lastname: {type: String},
        address: {type: String},
        city: {type: String},
        zip: {type: Number}
    },

});

const User = mongoose.model("User", userSchema);

module.exports = User;