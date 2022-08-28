const postgres = require('postgres');

const sql = postgres({ /* options */ }); // will use psql environment variables

module.exports = sql;
