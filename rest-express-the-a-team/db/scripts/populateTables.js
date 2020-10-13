const { query } = require("../index");

const { books, authors } = require("../seedData");

const populateAuthorsTable = async () => {
  const responses = [];
  for (const { first_name, last_name } of authors) {
    const response = await query(
      `INSERT INTO authors (first_name, last_name)
        VALUES ($1, $2)`,
      [first_name, last_name]
    );
    responses.push(response);
  }
  return responses;
};

const populateBooksTable = async () => {
  const responses = [];
  for (const { author_id, title, publishedDate } of books) {
    const [day, month, year] = publishedDate.split("/");

    const response = await query(
      `INSERT INTO books (author_id, title, published_date)
        VALUES ($1, $2, $3) RETURNING *;`,
      [author_id, title, new Date(Date.UTC(+year, month - 1, +day))]
    );
    responses.push(response.rows);
  }
  return responses;
};

const populateAllTables = async () => {
  await populateAuthorsTable();
  await populateBooksTable();
};

if (require.main === module) {
  populateAllTables();
}

module.exports = { populateAllTables };
