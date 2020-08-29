const sql = require('./db');

const Master = function(master) {
  this.firstname = master.firstname;
  this.lastname = master.lastname;
  this.email = master.email;
  this.phone = master.phone;
  this.birthdate = master.birthdate
  this.city_id = master.city_id;
  this.pwd = master.pwd;
};

Master.create = async (newCustomer, result) => {
  const [rows,fields] = await sql.promisePool.query("INSERT INTO masters SET ?", newCustomer);
  console.log("created customer: ", { id: rows.insertId, ...newCustomer });
  result(null, { id: rows.insertId, ...newCustomer });
};

module.exports = Master;