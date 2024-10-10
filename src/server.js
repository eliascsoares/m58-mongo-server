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

app.get("/getBook", async (req, res) => {
    try {
        const output = await Book.find({})
        res.status(200).json(output) 
    } catch (error) {
        console.log(error);
        const responseMessage = {
            message: `Unable to find book list`
        }
        res.status(500).json(responseMessage)
    }

})
// Get all books

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
})
// Add a book

app.get("/getSingleBook", async function getSingleBook(req, res) {
    try {
        const title = req.query.title;
        const book = await Book.findOne({ title: title });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving book" });
    }
});
// Get a Single book using the title

app.put("/updateAuthor", async function updateAuthor(req, res) {
    try {
        const title = req.body.title;
        const newAuthor = req.body.author;
        const updatedBook = await Book.findOneAndUpdate(
            { title: title },
            { author: newAuthor },
            { new: true }
        );
        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating book author" });
    }
});
// Update the author 

app.put("/updateGenre", async function updateGenre(req, res) {
    try {
        const title = req.body.title;
        const newGenre = req.body.genre;
        const updatedBook = await Book.findOneAndUpdate(
            { title: title },
            { genre: newGenre },
            { new: true }
        );
        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating book genre" });
    }
});
// Update book genre

app.get("/health", (req, res) => {res.send("API is healthy")})
//health route to verify server is running

app.listen(5001, () => {console.log("SERVER IS LISTENING ON PORT 5001")})
//This is the listener which is the heart of the server