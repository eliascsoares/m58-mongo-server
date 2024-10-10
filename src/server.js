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

app.post("/addBook", async (req, res) => {
   try {
    const result = await Book.create(
        {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre
        }
    )
    console.log(result);
    const responseMessage = {
        message: `Book ${req.body.title} has been added`
    }
    res.status(201);
    res.json(responseMessage)
   } catch (error) {
    console.log(error);
    const responseMessage = {
        message: `Book ${req.body.title} was not added`,
        DBresponse: error 
    }
    res.status(418).json(responseMessage)
   } 
}

)

app.get("/health", (req, res) => {res.send("API is healthy")})
//health route to verify server is running

app.listen(5001, () => {console.log("SERVER IS LISTENING ON PORT 5001")})
//This is the listener which is the heart of the server