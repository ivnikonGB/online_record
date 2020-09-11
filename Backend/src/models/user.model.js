//file version 1.1.0
const sql = require('./db');
const bcryptjs = require('bcryptjs');

const Customer = function(customer) {
    this.email = customer.email;
    this.pwd = customer.pwd;
    this.role = customer.role;
};


Customer.create = async (newCustomer, result) => {
  newCustomer.pwd = await bcryptjs.hash(newCustomer.pwd, 10);
  let customerObj;
  try{
    const [customer,fields] = await sql.promisePool.query("INSERT INTO logins SET ?", newCustomer);
    console.log(customer);
    if (newCustomer.role == 0) {
      const [rowsUser,fields] = await sql.promisePool.query(`INSERT INTO users (id) VALUES (${customer.insertId});`);
      result(null, { message: "User created" });
      return;
    };
    if (newCustomer.role == 1) {
      const [rowsMaster,fields] = await sql.promisePool.query(`INSERT INTO masters (id) VALUES (${customer.insertId});`);
      result(null, { message: "Master created" });
    };
  } catch (e){
    result(e, null);
  };
};

//карточка мастера
Customer.findById = async (customerId, result) => {
  const [master,fieldsmaster] = await sql.promisePool.query(`SELECT logins.id, masters.firstname, masters.lastname, citys.city as city, TIMESTAMPDIFF(YEAR,masters.birthdate,CURDATE()) AS age, education.title as education, masters.experience, masters.price, masters.info, photo from logins left join masters using(id) left JOIN citys ON (masters.city_id=citys.id) left JOIN education ON (masters.education_id=education.id) where logins.id = ${customerId};`);
  const [joblist,fieldsjoblist] = await sql.promisePool.query(`SELECT group_concat(joblist.title order by joblist.title) as jobs FROM master_joblist INNER JOIN joblist ON (master_joblist.joblist_id=joblist.id) where master_id = ${customerId};`);
  if (master.length) {
    master[0].jobs = (joblist[0].jobs).split(',');
    result(null, master[0]);
    return;
  }
    result({ kind: "not_found" }, null);
};

//полечение всех мастеров
Customer.getAllMasters = async result => {
  const [masters,fieldsmasters] = await sql.promisePool.query("SELECT masters.id, firstname, lastname, TIMESTAMPDIFF(YEAR,birthdate,CURDATE()) AS age, education.title as education, experience, price, info, citys.city as city, photo FROM masters left JOIN citys ON (masters.city_id=citys.id) left JOIN education ON (masters.education_id=education.id);");
  const [joblists,fieldsjoblist] = await sql.promisePool.query(`SELECT master_id, group_concat(joblist.title order by joblist.title) as jobs FROM master_joblist INNER JOIN joblist ON (master_joblist.joblist_id=joblist.id) group by master_id;`);
  if (masters.length && joblists.length) {
    for (var master of masters) {
      for (var joblist of joblists) {
        if (master.id === joblist.master_id){
          master.jobs = (joblist.jobs).split(',');
        };
      };
    };
    result(null, masters);
    return;
  };
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
      cat.jobs = [];
      for(var job of jobs){
        if (cat.id === job.category_id){
            cat.jobs.push(job);
        };
      };
    }
  result(null, cats);
};

module.exports = Customer;