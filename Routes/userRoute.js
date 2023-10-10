//Importing all the required dependencies.
const express = require("express");
const {userLogin,userSignup} = require("../Controllers/userController")
const userRouter = express.Router();

//Defining the routes for user login and signup
userRouter.post("/signup",userSignup)
userRouter.post("/login",userLogin);

//Exporting the user Router
module.exports = {userRouter}