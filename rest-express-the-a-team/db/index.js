const { Pool } = require("pg");

const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports.query = pool.query.bind(pool);
