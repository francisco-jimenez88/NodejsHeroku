const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");


const path = require("path");
const app = express();

app.use(express.urlencoded( {extended: true }));
app.use(express.static(path.join(__dirname, "css")));

app.set("view engine", "ejs");



app.get("*", (req, res) => res.send("404"));

const port = process.env.PORT || 8000;
mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(port, () => console.log(`Connection success on port: ${port}`)));