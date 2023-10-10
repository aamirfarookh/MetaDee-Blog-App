// Importing all the required dependencies
const { BlogModel } = require("../Models/blogModel");
const { UserModel } = require("../Models/userModel");
require("dotenv").config();





// Controller logic for creating a post
// const createPost = async(req,res)=>{
//      try {
//         // Getting data from request body.
//         const {title, description,imageUrl,userId} = req.body;

//         // Checking if all the necessary data is present in the payload or not.
//         if(!title || ! description || !userId){
//            return res.status(400).send({msg:"Please provide all the details"})
//         }
        
//         // Creating a new blog using the data from the payload
//         const newBlog = new BlogModel({title,description,imageUrl,author:userId});
//         await newBlog.save();

//         // sending the resposne for successful blog creation
//         return res.status(201).send({msg:"New blog created successfully."})
//      } catch (error) {
//        console.log(error);
//        res.status(500).send({msg:error.message})       
//      }
// }


// Controller logic for reading all posts
const readPosts = async(req,res)=>{
    try {
        // Getting all the blogs from the database
        const blogs = await BlogModel.find();

        //Sending the blogs data in the response
        res.status(200).send(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:error.message})
    }
}

//Controller logic for updating the blog of a user
const updatePost = async(req,res)=>{
    try {
        // getting all the necessary data from request body
        const{title,description,imageUrl} = req.body;

        //Getting the blog Id that is to be updated from the query params
        const blogId = req.params.id;
        
        // Getting the user Id from the request body passed into the request body from the auth middleware
        const { userId } = req.user;

        // Getting the user details from the database using it's Id.
        const user = await UserModel.findOne({_id:userId});

        // Checking if user is present in database or not.
        if(!user){
         return res.status(404).send({msg:"User not found!"})
        }

        // Looking for the blog with the id in the database;
        const blog = await BlogModel.findOne({_id:blogId});

        // Checking if blog is present or not
        if(!blog){
            return res.status(404).send({msg:"Blog not found!!"})
        }

        // Checking if the user is only updating his/her blog or not.
        if(userId !== blog.author ){
            return res.status(401).send({msg:"Not authorized to update this blog!!"})
        }

        // Updating the blog using blog Id and providing it with the payload
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId,{title,description,imageUrl});
        await updatedBlog.save();

        //Sending response for successful updation of a blog.
        return res.status(200).send({msg:`Blog with Id ${blogId} has been updated successfully!`})
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:error.message})
    }
}

// Controller logic for deleting a blog of a user
const deletePost = async(req,res)=>{
    try {
        //Getting blog Id from query parans
        const blogId = req.params.id;

        // Getting the user Id from the request body passed into the request body from the auth middleware
        const { userId } = req.user;

        // Getting the user details from the database using it's Id.
        const user = await UserModel.findOne({_id:userId});

        // Checking if user is present in database or not.
        if(!user){
         return res.status(404).send({msg:"User not found!"})
        }

        // Looking for the blog with the id in the database;
        const blog = await BlogModel.findOne({_id:blogId});

        // Checking if blog is present or not
        if(!blog){
            return res.status(404).send({msg:"Blog not found!!"})
        }

        // Checking if the user is only deleting his/her blog or not.
        if(userId !== blog.author ){
            return res.status(401).send({msg:"Not authorized to delete this blog!!"})
        }


        // Deleting a blog with the given ID
         const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
           
         // Sending response on succesfull deletion of a blog
         return res.status(200).send({msg:`Blog with Id ${blogId} deleted successfully.`})

    } catch (error) {
        console.log(error);
        res.status(500).send({msg:error.message})
    }
}

//Controller logic for Search functionality.
const searchPost = async(req,res)=>{
    try {
        // Getting title of a blog from the query object.
        const {title}= req.query

        // Using the "title" field for searching, and ensure it's case-insensitive
        const query = title ? {title: { $regex: title, $options: 'i' } } : {};

        // Looking into database for the title passed in query.
        const serachedItem= await BlogModel.find(query)

        //Checking if there is any blog in database which matches the search query.
        if(!serachedItem){
            return res.status(400).send({msg:"No blog found with this title!!"})
        }

        // Sending the searched blogs in the response on successful search.
        return res.status(200).send(serachedItem)
    } catch (error) {
        console.error(error);
    res.status(500).send({ error: error.message});
    }
}

//Exporting all the necessary controllers.
module.exports = {readPosts,updatePost,deletePost,searchPost}