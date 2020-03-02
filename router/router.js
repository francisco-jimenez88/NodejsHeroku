const express = require("express");
const router = express.Router();
const databaseCandy = require("../model/productSchema");

// För att komma till förstasidan 
router.route("/")
    .get(async (req, res) => {
        const item = await databaseCandy.find();

        res.render("index", { item, title: "Lasses Lakrits"})
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