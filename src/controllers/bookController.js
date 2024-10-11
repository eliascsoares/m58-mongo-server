const Book = require("../models/bookmodel");

exports.getAllBooks = async (req, res) => {
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
}
// Get all books

exports.getSingleBook = async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.title).trim();
        //Used trim() to remove extra spaces at the beginning and end of the title
        const book = await Book.findOne({ title: { $regex: new RegExp(`^${title}$`, 'i') } });
        if (book) {
            res.status(200).json(book);
        } else {
            const allBooks = await Book.find({}, 'title');
            console.log("All book titles in database:", allBooks.map(b => b.title));
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving book" });
    }
}
// Get a Single book

exports.addBook = async (req, res) => {
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
// Add a book

exports.updateAuthor = async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.title);
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
};
// Update Author

exports.updateGenre = async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.title);
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
};
// Update Genre

exports.deleteBook = async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.title);
        const deletedBook = await Book.findOneAndDelete({ title: title });
        if (deletedBook) {
            res.status(200).json({ message: "Book deleted successfully" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting book" });
    }
};
// Delete a Book