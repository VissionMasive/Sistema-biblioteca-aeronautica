const { Pool } = require("pg");
const connectionstring =
  "postgres://postgres:postgres@localhost:5432/biblioteca";
const pool = new Pool({
  host: "localhost",
  user: "Angelo",
  password: "angelo",
  database: "biblioteca",
  port: 5432,
});
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
}
module.exports = { pool, query };
