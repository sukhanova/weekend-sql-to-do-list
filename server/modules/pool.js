// require
const pg = require("pg");
const url = require('url');
//globals
const Pool = pg.Pool;
let config = {}; //end config
const pool = new Pool(config);

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(":");

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
    max: 10,
    idleTimeoutMillis: 30000,
  };
} else {
  config = {
    host: "localhost",
    port: 5432,
    database: "weekend-to-do-app",
    max: 10,
    idleTimeoutMillis: 30000,
  };
}

// db connection
pool.on("connect", () => {
  console.log("connected to db");
}); // end db error

pool.on("error", (err) => {
  console.log("ERROR connecting to DB:", err);
}); //end db error

// exports
module.exports = pool;
