//Importing all the required dependencies
const {UserModel} = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// Controller logic for user registration
const userSignup = async(req,res)=>{
  try {
    //Getting payload from request body
    const {name,email,password} = req.body;

    //Handling if any data is missing in payload
    if(!name || !email || !password){
        return res.status(400).send({msg:"All feilds are required"})
    }

    // Checking for the user in database if they are already present
    const isUserPresent = await UserModel.findOne({email});

    //Handling if user is present or not in the database and sending the response accordingly.
    if(isUserPresent){
       return res.status(400).send({msg:"User already registered. Please Login!"})
    }

    // Hashing the password to be saved in database
    const hashedpassword = bcrypt.hashSync(password,5);
    
    // Saving new user details in the database
    const newUser =  new UserModel({name,email,password:hashedpassword});
    await newUser.save()

    // Sending the registration success msg on successful user registartion
    return res.status(201).send({msg:"User registered successfully!"})

  } catch (error) {
    console.log(error)
    res.status(500).send({msg:error.message});
  }
}


// Controller logic for user logic
const userLogin = async(req,res)=>{
    try {
      //Getting payload from request body
      const {email,password} = req.body; 

      //Looking for user in the database
      const user = await UserModel.findOne({email});

      //Handling if user is not present in database
      if(!user){
        return res.status(400).send({msg:"Not at existing user. Please register!"})
      }

      //comparing the password with the hashed password saved in the database
      const comparedPassword = bcrypt.compareSync(password,user.password);

      //Handling if the password provided doesn't match with the hashed password
      if(!comparedPassword){
        return res.status(401).send({msg:"Password is invalid!"})
      }

      //Generating the access token for user authentication
      const accessToken = jwt.sign({ userId: user._id },process.env.TokenSecret, {expiresIn: "24hr"});
      
      //Sending the login success msg and access token in response on successful login
      res.status(200).send({msg:"User Login Success!!",access_token:accessToken});

    } catch (error) {
      console.log(error);
      res.status(500).send({msg:error.message})
    }
  }
 
  // Exporting the user login and signup controllers
  module.exports = {userSignup,userLogin}