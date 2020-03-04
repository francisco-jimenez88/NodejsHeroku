const express = require("express");
const router = express.Router();
const databaseCandy = require("../model/productSchema");
const databaseCustomer = require("../model/customerSchema");
const bodyParser = require('body-parser')

router.use(bodyParser.json())

// För att komma till förstasidan 
router.route("/")
    .get(async (req, res) => {
        const item = await databaseCandy.find();

        res.render("index", { item, title: "Lasses Lakrits" })
    })

    .post(async (req, res) => {
        // Kolla om kunden redan finns i databasen
        const resultOfFindCustomer = await databaseCustomer.findOne({ user: req.body.user, password: req.body.password })
        console.log(resultOfFindCustomer)
        if (resultOfFindCustomer) {
            // Här ska kunden loggas in 
            // res.send("Kunden finns och kommer att loggas in.")
            res.render("myPage")

        } else {
            // Skapar en ny kund till databasen
            const addCustomer = await new databaseCustomer({ user: req.body.user, password: req.body.password })
            if (addCustomer)
                console.log('customer created:' + addCustomer)

            addCustomer.save((error, success) => {
                if (error) {
                    console.log('smthn wrong')
                    res.send(error._message);
                } else {
                    console.log('alles gut, gick att skapa ny användare')
                    // res.send("Kunden har nu skapats till databasen"); 
                    res.render('myPage')
                }
            });
        }
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

// För att komma till mina sidor
router.route("/mypage")
    .get(async (req, res) => {

        res.render("myPage.ejs")
    })

module.exports = router;