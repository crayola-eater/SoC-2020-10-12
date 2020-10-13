// - **Create your table:** In `/scripts/createTable.js`, write a SQL statement to create a table with columns for `name`, `human`, and `hobby`. Use your `query` in a function to send your SQL statement to your database. Run this file and check for your table on the database on Heroku.

const { query } = require("../index");

const createTable = async () => {
  return await query(
    `CREATE TABLE IF NOT EXISTS cats (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      human VARCHAR(50) NOT NULL,
      hobby VARCHAR(50) NOT NULL
    );`
  );
};

if (require.main === module) {
  (async () => {
    console.log(await createTable());
  })();
}
