const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{

<<<<<<< HEAD
    const token = req.cookies.jsonwebtoken
    console.log("usertoken", token)

=======
    const token = req.cookies.jsonwebtoken;
    console.log("Här kommer token:");
    console.log(token);
>>>>>>> f23e0edb82171dc730c9c15b22f97886f101a7b0
    if(token) {
        const user = jwt.verify(token, "secretkey")

        req.user = user;
        next();
    }
    else {
        res.send("No valid cookie-Token") //res.redirect("/login")
    }

}