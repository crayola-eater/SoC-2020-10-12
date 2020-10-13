const { query } = require("../index");

const createAuthorsTable = async () => {
  return await query(
    `CREATE TABLE IF NOT EXISTS authors (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL
    )`
  );
};

const createBooksTable = async () => {
  return await query(
    `CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      author_id INTEGER REFERENCES authors (id),
      title VARCHAR(100) NOT NULL,
      published_date TIMESTAMP NOT NULL
    )`
  );
};

const createAllTables = async () => {
  await createAuthorsTable();
  await createBooksTable();
};

if (require.main === module) {
  createAllTables();
}

module.exports = { createAllTables };
