const express = require("express");
const router = express.Router();
const databaseCandy = require("../model/productSchema");
const bodyParser = require("body-parser")
const flash = require("req-flash");
const User = require("../model/userSchema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const verifyToken = require("./verifyToken")


// router.use(flash())

// För att komma till förstasidan 
router.route("/")
    .get(async (req, res) => {
        const item = await databaseCandy.find();

        res.render("index", { item, title: "Lasses Lakrits" })
    })

    .post(async (req, res) => {

    })

// Router för att komma till sidan med alla produkter
router.route("/allproducts")
    .get(async (req, res) => {

        const allCandy = await databaseCandy.find();

        res.render("allproducts", { allCandy, title: "Lasses Lakritsar" })
    })

// För att komma till en specifik produkt
router.route("/allproducts/:id")
    .get(async (req, res) => {
        console.log(req.params.id);
        const selectedCandy = await databaseCandy.findOne({ name: req.params.id })
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
    })

//Login sida
router.route("/login")
    .get(async (req, res) => {
        res.render("login", { title: "Logga in - Lasses Lakrits" })
    })
    .post(async (req, res) => {

        const user = await User.findOne({ email: req.body.email })

        if (!user) return res.render("login")
        console.log(user.password)
        const compareHash = await bcrypt.compare(req.body.password, user.password)

        if (!compareHash) return res.redirect("/login")

        if (user.admin == true) return res.redirect("/admin")

        /* jwt.sign({ user }, "secretkey", (err, token) => {
            if (err) return res.redirect("/login")
            if (token) {
                const cookie = req.cookies.jsonwebtoken;
                if (!cookie) {
                    res.cookie("jsonwebtoken", token, { maxAge: 3600000, httpOnly: true })
                }

                res.render("myPage", { user, token })

            } */

        res.redirect("/")
    })
    

// För att komma till mina sidor
router.route("/mypage")
    .get(async (req, res) => {

        res.render("myPage.ejs", { title: "Min sida - Lasses Lakrits" })
    })

// För att komma till checkout
router.route("/checkout")
    .get(async (req, res) => {
        const shoppingBag = await databaseCandy.find();
        res.render("checkout.ejs", { shoppingBag, title: "Checkout" })
    })

module.exports = router;