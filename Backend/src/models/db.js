//file version 1.1.0
async function dbCreatePool() {
  const mysql = require('mysql2');
  const dbconf = require('../config/db.config');

  const pool = await mysql.createPool({
    connectionLimit: dbconf.CL,
    host: dbconf.HOST,
    user: dbconf.USER,
    password: dbconf.PASSWORD,
    database: dbconf.DB
  });

  const promisePool = pool.promise();
    console.log('[2] - MySQL Pool created!');
    exports.promisePool = promisePool;   
};
dbCreatePool();
