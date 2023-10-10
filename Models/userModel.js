// Importing mongoose ORM for mongoDB database connection
const mongoose = require("mongoose");

//Defining the user Schema.
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
});

//Defining the user Model
const UserModel = mongoose.model("User",userSchema);

//Exporting the user model.
module.exports = {UserModel}