const { query } = require("./index");

const { addOneCat } = require("./scripts/populateTable");

const getCats = async () => {
  const response = await query("SELECT * FROM cats");
  return response.rows;
};

const addCat = async (cat) => {
  const response = await addOneCat(cat);
  return response.rows[0];
};

module.exports = { getCats, addCat };
