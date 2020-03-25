const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{

<<<<<<< HEAD
    const token = req.cookies.jsonwebtoken
    console.log("usertoken", token)

=======
    const token = req.cookies.jsonwebtoken;
   
>>>>>>> 5cb1de28494d67e01670b012472fcdbbdcae799d
    if(token) {
        const user = jwt.verify(token, "secretkey")

        req.user = user;
        next();
    }
    else {
<<<<<<< HEAD
        res.send("No valid cookie-Token") //res.redirect("/login")
=======
        res.send("No valid cookie-Token") 
>>>>>>> 5cb1de28494d67e01670b012472fcdbbdcae799d
    }

}