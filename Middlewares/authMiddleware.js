// Importing all the necessary dependencies
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Defining the authentication middleware for user authentication
const userAuth = async(req,res,next)=>{
    // Getting the user's access token from request headers
    const access_token = req.headers.authorization;

    // Checking if the access token is present in headers or not
    if (!access_token) {
        return res.status(400).send({ msg: "No token provided, please login!" });
      }

    // Verifying the access token using jwt and moving to next route on successful verification
    jwt.verify(access_token,process.env.TokenSecret,(err,payload)=>{
        if(!payload){
            return res.status(401).send({msg:"Token expired. Please login again"})
        }
        else if (payload) {
            req.body.userId = payload.userId;
            next();
        }
        else{
            console.log(err);
            res.status(500).send({msg:err.message})
        }
    })

}

//Exporting the user authentication middleware.
module.exports = {userAuth}