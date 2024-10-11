const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            require: true,
            unique: true
        },
        author: {
            type:String,
            require: false,
            unique: false
        },
        genre: {
            type:String,
            require: false,
            unique: false
        }
    }
)

const Book = mongoose.model("book", bookSchema);
module.exports = Book;