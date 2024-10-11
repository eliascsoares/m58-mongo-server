const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.get("/:title", bookController.getSingleBook);
router.post("/", bookController.addBook);
router.put("/:title/author", bookController.updateAuthor);
router.put("/:title/genre", bookController.updateGenre);
router.delete("/:title", bookController.deleteBook);
router.delete("/", bookController.deleteAllBooks);

module.exports = router;
