const { Pool } = require("pg");

const config = require("dotenv").config();

if (config.error) {
  throw config.error;
}

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.HOST,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports.query = pool.query.bind(pool);
