//Sample data to use:

// - **Populate your table:** In `/scripts/populateTable.js`, you'll notice that you have an array of cats as sample data. Write a SQL query to populate the table you made in your `createTable` script with this cats data. Use your `query` to send this SQL query to your database too. Run this file and check that your table is populated on Heroku.

const { query } = require("../index");

const addOneCat = async ({ name, human, hobby }) => {
  return await query(
    `INSERT INTO cats (name, human, hobby)
      VALUES ($1, $2, $3) RETURNING *`,
    [name, human, hobby]
  );
};

const addManyCats = async (cats) => {
  const responses = [];
  for (const cat of cats) {
    responses.push(await addOneCat(cat));
  }
  return responses;
};

const cats = [
  {
    name: "Poppy",
    human: "Tim",
    hobby: "screm",
  },
  {
    name: "Tony",
    human: "Liz.K",
    hobby: "cling",
  },
  {
    name: "Narla",
    human: "Mell",
    hobby: "obstruct",
  },
];

module.exports = {
  addOneCat,
  addManyCats,
};

if (require.main === module) {
  (async () => {
    console.log(await addManyCats(cats));
  })();
}
