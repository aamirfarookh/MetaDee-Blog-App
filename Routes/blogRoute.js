//Importing all the required dependencies
const express = require("express");
const {
  readPosts,
  updatePost,
  deletePost,
  searchPost,
} = require("../Controllers/blogController");
const multer = require("multer");
const AWS = require("aws-sdk");
const {BlogModel} = require("../Models/blogModel");
const path = require("path");
const fs = require("fs")
require("dotenv").config();

//Defining the routes for blog posts
const blogRouter = express.Router();

// Defining all the routes here
blogRouter.get("/allblogs", readPosts);
blogRouter.patch("/update/:id", updatePost);
blogRouter.delete("/delete/:id", deletePost);
blogRouter.get("/search", searchPost);

// Configuring the AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});
const s3 = new AWS.S3();

// Configuring Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Defining the create blog route
blogRouter.post("/create", upload.single("image"), async (req, res) => {
  try {
    // Getting data from request body.
    const { title, description } = req.body;
    const { userId } = req.user;

    //Initializing the image url with an empty string
    let imageUrl = "";

    // Checking if all the necessary data is present in the payload or not.
    if (!title || !description || !userId) {
        console.log(title,description,userId)
      return res.status(400).send({ msg: "Please provide all the details" });
    }

    if (req.file) {
      const inputPath = req.file.path;
      const outputPath = path.join("uploads", req.file.filename);

      // Upload the image to AWS S3
      const params = {
        Bucket: "metadeeblogs",
        Key: req.file.filename,
        Body: fs.createReadStream(outputPath),
      };
      const uploadResponse = await s3.upload(params).promise();
      imageUrl = uploadResponse.Location;
    }

    // Creating a new blog using the data from the payload
    const newBlog = new BlogModel({
      title,
      description,
      imageUrl,
      author: userId,
    });
    await newBlog.save();

    // sending the resposne for successful blog creation
    return res.status(201).send({ msg: "New blog created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

// Exporting the router to be used in main server file
module.exports = { blogRouter };
