const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    phone: {type: Number},
    wishlist:[{

        productId: {type: mongoose.Schema.Types.ObjectId,
        ref:"Candy"
        } }],

    address: {
        lastname: {type: String},
        address: {type: String},
        city: {type: String},
        zip: {type: Number}
    },

});

userSchema.methods.addToWishList = function(product){
    this.wishlist.push({productId: product._id})
    return this.save();
}

const User = mongoose.model("User", userSchema);

module.exports = User;