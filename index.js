//Importing all the required dependencies
const express = require("express");
const { Connection } = require("./config/db");
const { userRouter } = require("./Routes/userRoute");
const { userAuth } = require("./Middlewares/authMiddleware");
const { blogRouter } = require("./Routes/blogRoute");
const Port= process.env.PORT
require("dotenv").config()

// Initializing the express app
const app = express();

//Using the express.json middleware for sending json data.
app.use(express.json())

// Main route to check if the app is working or not.
app.get("/",(req,res)=>{
    res.send("everything is fine")
})

// Defining the user routes.
app.use("/user",userRouter);

// Defining the blog route with authentication.
app.use("/blogs",userAuth,blogRouter)


// Configuring the server and setting up the connection with database.
app.listen(Port,async()=>{
    try {
        await Connection
        console.log("connected to Database")
    } catch (error) {
        console.log(error.message)
    }

    console.log(`server is awake at port ${Port}`)
})






