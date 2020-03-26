const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    wishlist:[{
        candyId: {type: mongoose.Schema.Types.ObjectId,
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
userSchema.methods.addToWishList = function (Candy) {
this.wishlist.push({ Id: Candy._id })
const newWishlist = this.wishlist.filter( function( {candyId} ) {
 
  return !this.has(`${candyId}`) && this.add(`${candyId}`)
},new Set)
console.log(newWishlist)
this.wishlist = [...newWishlist]
return this.save();
 
}
//Ta bort produkt från wish-list
userSchema.methods.removeFromList = function (candyId) {

    const restOftheProducts = this.wishlist.filter((Candy) => {
        return Candy.candyId.toString()
            !==candyId.toString()
    })

    this.wishlist = restOftheProducts;
    return this.save();

}

const User = mongoose.model("User", userSchema);

module.exports = User;