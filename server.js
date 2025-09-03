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
app.use(express.urlencoded({ extended: false }));

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
app.get("/fruits/new", (req,res)=>{
    res.render("new.ejs");
});
// POST /fruits
app.post("/fruits", async (req, res) => {
  req.body.isReadyToEat === "on" ? req.body.isReadyToEat = true :  req.body.isReadyToEat = false;
  try{
        await Fruit.create(req.body);
  } catch (error) {
      console.log("Error creating fruit:", error);
  }
  res.redirect("/fruits/new");
});

app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  //console.log(allFruits); // log the fruits!
  //res.send("Welcome to the index page!");
  res.render('index.ejs',{fruits: allFruits});
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
