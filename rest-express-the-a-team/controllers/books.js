const books = require("../models/books");

const getBooks = async (req, res, next) => {
  try {
    res.json({
      success: true,
      payload: await books.getAllBooks(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Unknown error",
    });
  }
};

const getBooksByTitle = async (req, res, next) => {
  const partialTitle = req.query.search;
  if (!partialTitle) {
    return next();
  }

  try {
    res.json({
      success: true,
      payload: await books.getBooksByTitle(partialTitle),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Unknown error",
    });
  }
};

const getBooksByAuthor = async (req, res, next) => {
  const partialAuthor = req.query.author;
  if (!partialAuthor) {
    return next();
  }
  try {
    res.json({
      success: true,
      payload: await books.getBooksByAuthor(partialAuthor),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Unknown error",
    });
  }
};

const getBookById = async (req, res, next) => {
  const bookId = +req.params.id;
  if (!bookId) {
    return next();
  }
  try {
    const [book] = await books.getBookById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "No book with that ID.",
      });
    }
    res.json({
      success: true,
      payload: book,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Unknown error",
    });
  }
};

const createBook = async (req, res, next) => {
  const bookToCreate = req.body;
  try {
    res.json({
      success: true,
      payload: await books.createBook(bookToCreate),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: true,
      error: "Unknown error",
    });
  }
};

const updateBookById = async (req, res, next) => {
  const bookId = req.params.id;
  if (!bookId) {
    return next();
  }

  try {
    const [book] = await books.updateBookById(+bookId, req.body);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "No book with that ID.",
      });
    }
    res.json({
      success: true,
      payload: book,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Unknown error",
    });
  }
};

const deleteBookById = async (req, res, next) => {
  const bookId = req.params.id;
  if (!bookId) {
    return next();
  }
  try {
    const [book] = await books.deleteBookById(+bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "No book with that ID.",
      });
    }
    res.json({
      success: true,
      payload: book,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Unknown error",
    });
  }
};

const updateBookFieldsById = async (req, res, next) => {
  const bookId = req.params.id;
  if (!bookId) {
    return next();
  }
  const updatedFields = req.body;
  res.json({
    succes: true,
    payload: await books.updateBookFieldsById(+bookId, updatedFields),
  });
};

module.exports = {
  getBooks,
  getBooksByTitle,
  getBooksByAuthor,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
  updateBookFieldsById,
};
