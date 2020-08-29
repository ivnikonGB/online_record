const sql = require('./db');

const Customer = function(customer) {
    this.firstname = customer.firstname;
    this.lastname = customer.lastname;
    this.email = customer.email;
    this.phone = customer.phone;
    this.city_id = customer.city_id;
    this.pwd = customer.pwd;
};

Customer.create = async (newCustomer, result) => {
    const [rows,fields] = await sql.promisePool.query("INSERT INTO users SET ?", newCustomer);
    //console.log("created customer: ", { id: rows.insertId, ...newCustomer });
    result(null, { id: rows.insertId, ...newCustomer });
};

//карточка мастера
Customer.findById = async (customerId, result) => {
  const [rows,fields] = await sql.promisePool.query(`SELECT masters.id, firstname, lastname, email, phone, TIMESTAMPDIFF(YEAR,birthdate,CURDATE()) AS age, education.title as Образование, experience, price, info, citys.city as Город FROM masters INNER JOIN citys ON (masters.city_id=citys.id) INNER JOIN education ON (masters.education_id=education.id) where masters.id = ${customerId};`);
    if (rows.length) {
      //console.log("found customer: ", rows[0]);
      result(null, rows[0]);
      return;
    }
      result({ kind: "not_found" }, null);
};

//полечение всех мастеров
Customer.getAllMasters = async result => {
  const [rows,fields] = await sql.promisePool.query("SELECT * From masters;");
  //console.log("customers: ", rows)
  result(null, rows);
};
//полечение всех городов
Customer.getAllCitys = async result => {
  const [rows,fields] = await sql.promisePool.query("SELECT * From citys ORDER by id;");
  result(null, rows);
};

//полечение всех категорий и подкатегорий
Customer.getAllCategory = async result => {
  const [cats,fieldscat] = await sql.promisePool.query("SELECT * FROM category order by id;");
  const [jobs,fieldsjob] = await sql.promisePool.query("SELECT * FROM joblist order by id;");
    for (var cat of cats) {
      catId = cat.id;
      cat.jobs = [];
      for(var job of jobs){
        jobCatId = job.category_id;
        if (catId === jobCatId){
            cat.jobs.push(job);
        };
      };
    }
  result(null, cats);
};
module.exports = Customer;