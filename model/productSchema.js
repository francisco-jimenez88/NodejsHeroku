const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema({
    name: { type: String, minlength: 3, unique: true, required: true },
    price: { type: Number, required: true },
<<<<<<< HEAD
=======
    img: { type: Buffer, data: Buffer },
>>>>>>> cb90b157d5c9e53465c0377f2e5c3f4b19df1326
    description: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    createdByAdmin: { type: String, required: true },
<<<<<<< HEAD
    img: { type: String, required: true },
    date: { type: Date, default: Date.now }
=======
    date: { type: Date, default: Date.now },
    color: {type: String, required: true}
>>>>>>> cb90b157d5c9e53465c0377f2e5c3f4b19df1326
});


const Candy = mongoose.model("Candy", schemaProduct);

module.exports = Candy;