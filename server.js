// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require('express');
const app = express();
//const PORT = 3000;

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
