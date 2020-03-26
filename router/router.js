const express = require("express");
const bodyParser = require("body-parser")
const User = require("../model/userSchema")
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendGridTransport = require("nodemailer-sendgrid-transport")
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken")
const config = require("../config/config");
const Candy = require("../model/productSchema");
const router = express.Router();

const transport = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: config.key
    }
}))
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
        const currentPage = req.query.page || 1;
        const items = 6;
        const sort = req.query.sort;
        const findProduct = await Candy.find()
        const sixProducts = await Candy.find().skip((currentPage - 1) * items).limit(items).sort({ text: sort });
        const pageCount = Math.ceil(findProduct.length / items)

        res.render("allproducts", { title: "Lasses Lakritsar", sixProducts, pageCount, currentPage })
        res.status("200")
    })

// För att komma till en specifik produkt
router.route("/allproducts/:id")
    .get(async (req, res) => {
        console.log(req.params.id);
        const selectedCandy = await Candy.findOne({ name: req.params.id });
        res.render("oneproduct", { selectedCandy, title: "Produkt" });
    })

//Signup sidan
router.route("/signup")
    .get(async (req, res) => {
        res.render("signup", { title: "Registrering - Lasses Lakrits" });
    })
    .post(async (req, res) => {

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = await new User({
            email: req.body.email,
            name: req.body.name,
            password: hashPassword,
            admin: req.body.admin
        }).save()
        console.log(user)
        res.redirect("/")

        const alreadyRegistered = await User.findOne({ email: req.body.email });

        if (req.body.email == alreadyRegistered) return res.redirect("/signup");
    })

//Login sida
router.route("/login")
    .get(async (req, res) => {
        res.render("login", { title: "Logga in - Lasses Lakrits" });
    })
    .post(async (req, res) => {

        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.redirect("/login");

        const compareHash = await bcrypt.compare(req.body.password, user.password);

        if (!compareHash) {
            return res.redirect("/login");
        } else {
            jwt.sign({ user }, "secretkey", (err, token) => {
                if (err){
                    return res.redirect("/login");
                } 

                if (token) {
                    const cookie = req.cookies.jsonwebtoken;
                    if (!cookie) {
                        res.cookie("jsonwebtoken", token, { maxAge: 3600000, httpOnly: true });
                    }
                    if (user.admin == true) return res.redirect("/admin");

                    res.render("myPage", {user, title: "Medlemssida - Lasses Lakrits"});
                    console.log("cookie");

                }
                res.redirect("/login");
            })
        })

        //Router för återställning av lösenord
router.get("/resetPassword", (req, res) => {
    res.render("resetPassword", { title: "Lasses Lakrits" })
})

router.post("/resetPassword", async (req, res) => {
    const user = await User.findOne({ email: req.body.resetMail })
    if (!user) return res.redirect("/signup");

    crypto.randomBytes(32, async (err, token) => {
        if (err) return res.redirect("/signup");
        const resetToken = token.toString("hex");

        user.resetToken = resetToken;
        user.expirationToken = Date.now() + 100000;
        await user.save();

        await transport.sendMail({
            to: user.email,
            from: "<no-reply>lasses@lakrits.se",
            subject: "Återställning av lösenord",
            html: `Följ denna länk för att återställa lösenord: http://localhost:8000/reset/${resetToken}`
        })
        res.redirect("/login")
 })
})

//Kollar ifall användare har token, då skickas man till sidan med formulär
router.get("/reset/:token", async (req, res) => {
    const user = await User.findOne({ resetToken: req.params.token, expirationToken: { $gt: Date.now() } })
     console.log(user);
    if (!user) return res.redirect("/signUp");

    res.render("resetForm.ejs" , {user})

})

router.post("/reset/:token", async(req, res)=>{
    const user = await User.findOne({_id:req.body.userId})

    user.password = await bcrypt.hash(req.body.password, 10) ;
    user.resetToken = undefined;
    user.expirationToken = undefined;
     await user.save();

res.redirect("/login");
})
        
//Mypage
router.get("/mypage", verifyToken, async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    res.render("userprofile/mypage", { user, title: "Medlemssida - Lasses Lakrits" });
});

//Logga ut
router.get("/logout", (req, res) => {
    res.clearCookie("jsonwebtoken").redirect("/login");
});

//Wishlist
router.get("/wishlist", verifyToken, async (req, res) => {
    const user = await User.findOne({ _id: req.user.user._id }).populate("wishlist.CandyId");

    res.render("userprofile/wishlist", { user, title: "Wishlist - Lasses" });
});

router.get("/wishlist/:id", verifyToken, async (req, res) => {
    const Candy = await Candy.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: req.body.user._id });

    await user.addToWishList(Candy);

    res.redirect("/wishlist");
});

router.get("/deleteWishlist/:id", verifyToken, async (req, res) => {
    const user = await User.findOne({ _id: req.body.user._id });
    user.removeFromList(req.params.id);
    res.redirect("/wishlist");
})


// För att komma till checkout
router.route("/checkout")
    .get(async (req, res) => {
        const shoppingBag = await Candy.find();
        res.render("checkout.ejs", { shoppingBag, title: "Checkout" });
    })

module.exports = router;