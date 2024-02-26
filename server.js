
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));

// Callback function to complete GET '/all'
const getAll = (req, res) => res.status(200).send(projectData);
app.get("/all", getAll);


// Callback function to complete POST '/add'
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
  }
// GET Route
app.post("/add", postData);

const port = 8080;
const hostname = "127.0.0.1";

// function to test the server 
const listening = () =>
console.log(`Server running at http://${hostname}:${port}/`);

// spin up the server
app.listen(port, listening);
