const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema({
    category: { type: String },
    name: { type: String, minlength: 3, required: true },
    price: { type: Number, required: true },
    img: { type: Buffer, data: Buffer },
    description: { type: String, required: true },
    createdByAdmin: { type: String, required: true },
    date: { type: Date, default: Date.now },
    color: {type: String, required: true}
});


const Candy = mongoose.model("Candy", schemaProduct);

module.exports = Candy;