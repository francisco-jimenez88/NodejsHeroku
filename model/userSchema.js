const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
<<<<<<< HEAD
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
=======
    wishlist:[{
        
        CandyId: {type: mongoose.Schema.Types.ObjectId,
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
const newWishlist = this.wishlist.filter( function( {CandyId} ) {
 
  return !this.has(`${CandyId}`) && this.add(`${CandyId}`)
},new Set)
console.log(newWishlist)
this.wishlist = [...newWishlist]
return this.save();
 
}
//Ta bort produkt från wish-list
userSchema.methods.removeFromList = function (CandyId) {

    const restOftheProducts = this.wishlist.filter((Candy) => {
        return Candy.CandyId.toString()
            !==CandyId.toString()
    })

    this.wishlist = restOftheProducts;
    return this.save();

>>>>>>> 5cb1de28494d67e01670b012472fcdbbdcae799d
}

const User = mongoose.model("User", userSchema);

module.exports = User;