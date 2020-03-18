const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const sassMiddleware = require("node-sass-middleware");
const lassesLakritsRouter = require("./router/router");
const admin = require("./router/admin/admin");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public")
}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
<<<<<<< HEAD
app.set('views',  [path.join(__dirname, 'views'),path.join(__dirname, 'views/public')]);
=======

app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/public')]);
>>>>>>> cb90b157d5c9e53465c0377f2e5c3f4b19df1326

app.use(lassesLakritsRouter);
app.use(admin);

app.get("*", (req, res) => res.send("404"));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

const port = process.env.PORT || 8000;
<<<<<<< HEAD
mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
=======
mongoose.connect(config.databaseUrl, options)
>>>>>>> cb90b157d5c9e53465c0377f2e5c3f4b19df1326
    .then(() => app.listen(port, () => console.log(`Connection success on port: ${port}`)));