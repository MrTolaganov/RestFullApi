const { Pool } = require("pg");
const { config } = require("dotenv");

config();
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

const pool = new Pool({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
});

pool.connect(err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("PostgresSQL connected successfully");
  }
});

module.exports = pool;

// const { Client } = require("pg");

// const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;
// const client = new Client({
//   user: DB_USERNAME,
//   password: DB_PASSWORD,
//   database: DB_NAME,
//   host: DB_HOST,
//   port: DB_PORT,
// });

// client.connect((err) => {
//     if(err) {
//         console.error(err.message);
//     } else {
//         console.log("connected");
//     }
// })

// module.exports = client
