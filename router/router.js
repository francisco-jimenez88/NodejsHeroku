const express = require("express");
const router = express.Router();
const databaseCandy = require("../model/productSchema");


router.route("/")
    .get(async (req, res) => {

        const item = await databaseCandy.find();

        res.render("index", { item, title: "Lasses Lakrits"})
    })


router.route("/allproducts")
    .get(async (req, res) => {

        const allCandy = await databaseCandy.find();



        res.render("allproducts", { allCandy, title: "Lasses Lakritsar" })
    })


router.route("/allproducts/:id")
    .get(async (req, res) => {
        console.log(req.params.id);
        const selectedCandy = await databaseCandy.findOne({ name: req.params.id })
        res.render("oneproduct", { selectedCandy, title: "Produkt" })
    })

module.exports = router;