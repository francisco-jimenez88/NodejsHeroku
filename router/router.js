const express = require("express");
const router = express.Router();
const Candy = require("../model/productSchema");
const bodyParser = require("body-parser")
const User = require("../model/userSchema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken")

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
        res.render("login", { title: "Logga in - Lasses Lakrits" })
    })
    .post(async (req, res) => {

        const user = await User.findOne({ email: req.body.email })

        if (!user) return res.render("login")
        //console.log(user.password)
        const compareHash = await bcrypt.compare(req.body.password, user.password)

        if (!compareHash) return res.redirect("/login")

        if (user.admin == true) return res.redirect("/admin")

        jwt.sign({ user }, "secretkey", (err, token) => {
            if (err) return res.redirect("/login")
            if (token) {
                const cookie = req.cookies.jsonwebtoken;
                if (!cookie) {
                    res.cookie("jsonwebtoken", token, { maxAge: 3600000, httpOnly: true })
                }
                console.log(user.password)
                res.redirect("/")
            }

            res.redirect("/")
        })
        res.redirect("/")
    })
    
    // För att komma till mina sidor
    router.route("/mypage")
        .get(async (req, res) => {
         /*  const user = await User.findOne({email: req.body.email})
            if(!user) return res.render("login.ej")
            if(req.body.email == user)*/ return res.render("myPage.ejs", {title: "Lasses lakrits - Mina sidor"} ,/*{user}*/)
            
        })
    //Logga ut
        router.get("/logout", async (req, res) => {
            res.clearCookie("jwtToken").redirect("/login")
        })
        
// För att komma till checkout
router.route("/checkout")
    .get(async (req, res) => {
    const shoppingBag = await Candy.find();
    res.render("checkout.ejs", { shoppingBag, title: "Checkout" })
    }) 

module.exports = router;