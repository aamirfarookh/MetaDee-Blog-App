// Importing mongoose ORM for mongoDB database connection
const mongoose = require("mongoose");

//Defining the blog Schema.
const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    imageUrl:{type:String},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true,
      }
});

//Defining the user Model
const BlogModel = mongoose.model("Blog",blogSchema);

//Exporting the user model.
module.exports = {BlogModel}