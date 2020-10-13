const { createAllTables } = require("./createTables");
const { dropAllTables } = require("./dropTables");
const { populateAllTables } = require("./populateTables");

const reinitialiseAllTables = async () => {
  await dropAllTables();
  await createAllTables();
  await populateAllTables();
};

if (require.main === module) {
  reinitialiseAllTables();
}
