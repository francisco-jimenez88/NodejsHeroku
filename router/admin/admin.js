const express = require("express");
const newCandy = require("../../model/productSchema");
const router = express.Router();
const multer = require("multer")
const path = require("path");
// const upload = multer({ dest: "/images" })
const fs = require('fs');


// Rakib bildhandeting  
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,"./public/images")
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() )
    }
})
var upload = multer({ storage: storage })



// Admin router 
router.route("/admin")
    .get(async (req, res) => {
        const findCandy = await newCandy.find();
        
        res.render("admin/admin", { findCandy, title: "Admin - Lasses Lakrits" })
    })
    .post(upload.single('img'), async (req, res) => {

        // Rakib bildhantering 
        console.log(req.file)

        await new newCandy({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            createdByAdmin: req.body.createdByAdmin,
           
            // Rakib bildhantering 
            img: cleanedImg

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