const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    wishlist:[{
        
        productId: {type: mongoose.Schema.Types.ObjectId,
            ref:"Candy"
        }
     }],
    userinfo: [{
       lastname: {type: String},
       phonenumber: {type: Number},
       address: {type: String},
       city: {type: String},
       zip: {type: Number}
        
    }]

});

// Lägg till produkt till wishlist
userSchema.methods.addToWishList = function (product) {
this.wishlist.push({ productId: product._id })
const newWishlist = this.wishlist.filter( function( {productId} ) {
 
  return !this.has(`${productId}`) && this.add(`${productId}`)
},new Set)
console.log(newWishlist)
this.wishlist = [...newWishlist]
return this.save();
 
}
//Ta bort prodult från wish-list
userSchema.methods.removeFromList = function (productId) {

    const restOftheProducts = this.wishlist.filter((product) => {
        return product.productId.toString()
            !==productId.toString()
    })

    this.wishlist = restOftheProducts;
    return this.save();

}


const User = mongoose.model("User", userSchema);

module.exports = User;