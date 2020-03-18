const express = require("express");
const router = express.Router();
const Candy = require("../model/productSchema");


// För att komma till förstasidan 
router.route("/")
    .get(async (req, res) => {
        const item = await Candy.find();

        res.render("index", { item, title: "Lasses Lakrits"})
    })
    // .post(async (req, res) => {

    // })
    
// Router för att komma till sidan med alla produkter
router.route("/allproducts")
    .get(async (req, res) => {

        const allCandy = await Candy.find();

        res.render("allproducts", { allCandy, title: "Lasses Lakritsar" })
    })

// För att komma till en specifik produkt
router.route("/allproducts/:id")
    .get(async (req, res) => {
        console.log(req.params.id);
        const selectedCandy = await Candy.findOne({ name: req.params.id })
        res.render("oneproduct", { selectedCandy, title: "Produkt" })
    })

// För att komma till mina sidor
router.route("/mypage")
    .get(async (req, res) => {
        
        res.render("myPage.ejs", { title: "Min sida"})
    }) 

module.exports = router;