const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema(
    {
        name: {type: String, required: true, minlength: 1},
        price: {Number, required: true},
        img: { data: Buffer, contentType: String, required: true },
        description: {String, required: true}
    }
)

const newCandy = mongoose.model("List of candy", schemaProduct);

module.exports = newCandy;