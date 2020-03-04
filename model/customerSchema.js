const mongoose = require("mongoose");

const schemaCustomer = new mongoose.Schema({
    user: { type: String, required },
    password: { type: String, required }
});


const newCustomer = mongoose.model("New customers", schemaCustomer);

module.exports = newCustomer;