const express = require("express");
const bodyParser = require("body-parser")
const User = require("../model/userSchema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken")
const config = require("../config/config");
const Candy = require("../model/productSchema");
const router = express.Router();

// router.use(flash())

// För att komma till förstasidan 
router.route("/")
    .get(async (req, res) => {
        const item = await Candy.find();

        res.render("index", { item, title: "Lasses Lakrits" })
    })

    .post(async (req, res) => {

    })

// Router för att komma till sidan med alla produkter
router.route("/allproducts")
    .get(async (req, res) => {
        //const allCandy = await Candy.find();
        const currentPage = req.query.page || 1;
        const items = 6;
        const sort = req.query.sort;
        const findProduct = await Candy.find()
        const sixProducts = await Candy.find().skip((currentPage - 1) * items).limit(items).sort({ text: sort });
        const pageCount = Math.ceil(findProduct.length / items)

        res.render("allproducts", { title: "Lasses Lakritsar", sixProducts, pageCount, currentPage  })
        res.status("200")
    })

// För att komma till en specifik produkt
router.route("/allproducts/:id")
    .get(async (req, res) => {
        console.log(req.params.id);
        const selectedCandy = await Candy.findOne({ name: req.params.id })
        res.render("oneproduct", { selectedCandy, title: "Produkt" })
    })

//Signup sidan
router.route("/signup")
    .get(async (req, res) => {
        res.render("signup", { title: "Registrering - Lasses Lakrits" })
    })
    .post(async (req, res) => {

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = await new User({
            email: req.body.email,
            name: req.body.name,
            password: hashPassword
        }).save()
        console.log(user)
        res.redirect("/")

        const alreadyRegistered = await User.findOne({ email: req.body.email}) 

        if(req.body.email == alreadyRegistered) return res.redirect("/signup")
    })

    //Login sida
    router.route("/login")
        .get(async (req, res) => {
    res.render("login", { title:"Logga in - Lasses Lakrits" })
        })
        .post(async (req, res) => {
     
    const user = await User.findOne({ email:req.body.email })
     
    if (!user) return res.redirect("/login")
    //console.log(user.password)
    const compareHash = await bcrypt.compare(req.body.password, user.password)
     
    if (!compareHash) return res.redirect("/login")
    
    jwt.sign({ user }, "secretkey", (err, token) => {
    if (err) return res.redirect("/login")
    if (token) {
    const cookie = req.cookies.jsonwebtoken;
    if (!cookie) {
    res.cookie("jsonwebtoken", token, { maxAge:3600000, httpOnly:true })
    console.log("Hej hej")
                    }
    if (user.admin == true) return res.redirect("/admin")
     
    res.redirect("/")
                }
     
    res.redirect("/login")
            })
        })
    
    //Logga ut
    router.get("/logout", async (req, res) => {
        res.clearCookie("jsonwebtoken").redirect("/login")
        })
        
//Mypage
    router.get("/mypage" , async (req, res) => {
        const user = await User.findOne({ email:req.body.email })
            res.render("userprofile/mypage.ejs",{ title:"Logga in - Lasses Lakrits" }, {user})
        })

    //Wishlist
    router.get("/wishlist",verifyToken , async (req, res)=>{
  
        const user = await User.findOne({_id: req.body.user._id}).populate("wishlist.productId")
           res.render("userprofile/wishlist.ejs", {user});
        
           })
           
    router.get("/wishlist/:id",verifyToken , async (req, res)=>{
        const product =  await  Candy.findOne({_id:req.params.id}) 
        const user = await User.findOne({_id: req.body.user._id})   
           // mata in ett product id från mongo databas  . Lägg den som string  "51232131231......."
           //console.log("product" , product)
            await user.addToWishList(product)
            //console.log("wishlist user " , user)
            res.redirect("/wishlist")
           //res.render("wishlist.ejs", {user});
           
           })
           
    router.get("/deleteWishlist/:id", verifyToken, async(req, res)=>{
             const user = await User.findOne({_id: req.body.user._id})
             user.removeFromList(req.params.id)
             res.redirect("/wishlist");
           })
           
// För att komma till checkout
router.route("/checkout")
    .get(async (req, res) => {
    const shoppingBag = await Candy.find();
    res.render("checkout.ejs", { shoppingBag, title: "Checkout" })
    }) 

module.exports = router;