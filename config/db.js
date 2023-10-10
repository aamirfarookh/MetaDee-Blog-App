//Importing all the required dependencies
const mongoose= require("mongoose")
require("dotenv").config()

// Configuring the database connnection
const Connection = mongoose.connect(process.env.mongo_URL);

// Exporting the database connection
module.exports = {Connection}