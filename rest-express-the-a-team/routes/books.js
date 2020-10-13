const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");

router.get("/:id", booksController.getBookById);
router.get("/", booksController.getBooksByAuthor);
router.get("/", booksController.getBooksByTitle);
router.get("/", booksController.getBooks);
router.post("/", booksController.createBook);
router.put("/:id", booksController.updateBookById);
router.delete("/:id", booksController.deleteBookById);
router.patch("/:id", booksController.updateBookFieldsById);

module.exports = router;
