const { query } = require("../index");

const dropAuthorsTable = async () => {
  return await query("DROP TABLE IF EXISTS authors");
};

const dropBooksTable = async () => {
  return await query("DROP TABLE IF EXISTS books");
};

const dropAllTables = async () => {
  await dropBooksTable();
  await dropAuthorsTable();
};

if (require.main === module) {
  dropAllTables();
}

module.exports = { dropAllTables };
