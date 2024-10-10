const express = require("express");
// This imports the express library
const app = express();
// This renames express to be called as per convention
app.use(express.json());
//This line tells express that we will send data to and from via json rather than xml

require("dotenv").config();
// This line imports and runs dotenv in one line
require("./db/connection");

const Book = require("./db/models/bookmodel");

app.get("/health", (req, res) => {res.send("API is healthy")})
//health route to verify server is running

app.listen(5001, () => {console.log("SERVER IS LISTENING ON PORT 5001")})
//This is the listener which is the heart of the server