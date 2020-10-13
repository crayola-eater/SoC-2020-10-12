const { query } = require("../index");

const deleteTable = async () => {
  return await query("DROP TABLE IF EXISTS cats");
};

if (require.main === module) {
  (async () => {
    console.log(await deleteTable());
  })();
}
