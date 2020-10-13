const { books, authors } = require("../db/seedData");
const { query } = require("../db/index");

const getAllBooks = async () => {
  const response = await query("SELECT * FROM books");
  return response.rows;
};

const getBooksByTitle = async (partialTitle) => {
  const response = await query(
    `SELECT * FROM books
      WHERE LOWER(title) = LOWER($1);`,
    partialTitle
  );
  return response.rows;
};

const getBooksByAuthor = async (partialAuthor) => {
  const response = await query(
    `SELECT * FROM books
      INNER JOIN authors
        ON books.author_id = authors.id
      WHERE LOWER(authors.first_name) = LOWER($1)
        OR LOWER(authors.last_name) = LOWER($1);`,
    [partialAuthor]
  );
  return response.rows;
};

const getBookById = async (id) => {
  const response = await query("SELECT * FROM books WHERE id = $1", [id]);
  return response.rows;
};

const createBook = async ({ author_id, title, published_date }) => {
  const [date, month, year] = published_date.split("/");
  const response = await query(
    `INSERT INTO books (author_id, title, published_date)
      VALUES ($1, $2, $3) RETURNING *;`,
    [author_id, title, new Date(Date.UTC(+year, month - 1, +date))]
  );
  return response.rows;
};

const updateBookById = async (id, { author_id, title, published_date }) => {
  const [date, month, year] = published_date.split("/");
  const response = await query(
    `UPDATE books
      SET (author_id, title, published_date) = ($1, $2, $3)
      WHERE id = $4
      RETURNING *;`,
    [author_id, title, new Date(Date.UTC(+year, month - 1, +date)), id]
  );
  return response.rows;
};

const deleteBookById = async (id) => {
  const response = await query("DELETE FROM books WHERE id = $1 RETURNING *;", [
    id,
  ]);
  console.log(response);
  return response.rows;
};

const updateBookFieldsById = async (id, updates) => {
  // TODO: Think columns need to be targeted dynamically.
  // See and try below:
  //
  // npm install pg-format
  // https://github.com/brianc/node-postgres/issues/1672#issuecomment-396361059
  // const format = require('pg-format');
  // async function updateFixtures(id, column, value) {
  //   const sql = format('UPDATE fixtures SET %I = $1 WHERE id = $2', column);
  //   await pool.query(sql, [value, id]);
  // }

  throw new Error("Not yet implemented.");
};

module.exports = {
  getAllBooks,
  getBooksByTitle,
  getBooksByAuthor,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
  updateBookFieldsById,
};
