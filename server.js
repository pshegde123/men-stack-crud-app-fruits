// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require('express');
const mongoose = require("mongoose"); 
const app = express();
//const PORT = 3000;

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
mongoose.connection.on("error", (err) => {
    console.log("Error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB.");
});

// Import the Fruit model
const Fruit = require("./models/fruit.js");

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
