const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const newCandy = require("./model/productSchema");
const sassMiddleware = require("node-sass-middleware");
const multer = require("multer")
const upload = multer({ dest: "images/" })
const fs = require('fs');
const path = require("path");
const app = express();
const lassesLakritsRouter = require("./router/router")

app.use(express.urlencoded({ extended: true }));

app.use(sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public")
}));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.set('views',  [path.join(__dirname, 'views'),path.join(__dirname, 'views/public')]);

app.use(lassesLakritsRouter);

app.route("/")
    .get(async (req, res) => {
        const findCandy = await newCandy.find();
        res.render("public/index", { findCandy, title: "Lasses Lakrits" })
    })
    .post(upload.single('img'), async (req, res) => {
        console.log(req.file)
        await new newCandy({
            category: req.body.category,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            createdByAdmin: req.body.createdByAdmin,
            img: req.file

        }).save((error, success) => {
            if (error) {
                res.send(error.message);
            }
            else {
                res.redirect("/");
            }
        });

    });

app.get("*", (req, res) => res.send("404"));

const port = process.env.PORT || 8000;
mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Connection success on port: ${port}`)));