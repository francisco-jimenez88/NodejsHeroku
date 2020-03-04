const mongoose = require("mongoose");

const schemaCustomer = new mongoose.Schema({
    user: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});


const newCustomer = mongoose.model("New customers", schemaCustomer);

module.exports = newCustomer;