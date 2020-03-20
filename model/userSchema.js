const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    wishlist:[{
        
        productId: {type: mongoose.Schema.Types.ObjectId,
            ref:"Candy"
        } }],

});

userSchema.methods.addToWishList = function(product){
    this.wishlist.push({productId: product._id})
    return this.save();
}

const User = mongoose.model("User", userSchema);

module.exports = User;