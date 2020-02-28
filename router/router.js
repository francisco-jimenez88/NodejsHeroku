const express = require("express");
const router = express.Router();
const newCandy = require("./model/productSchema");

router.route("/")
    .get(async (req, res) => {

        const allCandy = await newCandy.find();

        res.render("index.ejs")
    })


router.route("/categories")
    .get(async (req, res) => {

        const allCandy = await newCandy.find();
        res.render("allproducts.ejs")
    })


router.route("/categories/:name")
    .get(async (req, res) => {

        const selectedCandy = await newCandy.findById({_id: req.params.name})
        res.render("oneproduct", {selectedCandy})
    })