const express = require("express");
const newCandy = require("../../model/productSchema");
const router = express.Router();

const multer = require("multer")
const upload = multer({ dest: "images/" })
const fs = require('fs');

router.route("/admin")
    .get(async (req, res) => {
        const findCandy = await newCandy.find();
        res.render("admin/admin", { findCandy, title: "Admin - Lasses Lakrits" })
    })
    .post(upload.single('img'), async (req, res) => {
        console.log(req.file)
        await new newCandy({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            lakrits: req.body.lakrits = Boolean(req.body.lakrits),
            chokladlakrits: req.body.chokladlakrits = Boolean(req.body.chokladlakrits),
            createdByAdmin: req.body.createdByAdmin,
            img: req.file

        }).save((error, success) => {
            if (error) {
                res.send(error.message);
            }
            else {
                res.redirect("/admin");
            }
        });

    });


module.exports = router;