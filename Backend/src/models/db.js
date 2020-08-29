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
    console.log('[2] - Пул MySQL Создан!');
    exports.promisePool = promisePool;   
};
dbCreatePool();
