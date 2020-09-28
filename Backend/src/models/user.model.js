//file version 1.1.2
const sql = require('./db');
const bcryptjs = require('bcryptjs');
const { DEBUG } = require('../config/server.config');

const Customer = function(customer) {
    this.email = customer.email;
    this.pwd = customer.pwd;
    this.role = customer.role;
};


Customer.create = async (newCustomer, result) => {
  newCustomer.pwd = await bcryptjs.hash(newCustomer.pwd, 10);
  if (DEBUG) console.log(`[NewCustomer-Module] - Receive Register data:`,newCustomer);
  try{
    const [customer,fields] = await sql.promisePool.query("INSERT INTO logins SET ?", newCustomer);
    if (DEBUG) console.log(`[NewCustomer-Module] - Create Customer in logins table:`,customer);
    if (newCustomer.role == 0) {
      const [rowsUser,fields] = await sql.promisePool.query(`INSERT INTO users (id) VALUES (${customer.insertId});`);
      if (DEBUG) console.log(`[NewCustomer-Module] - Success Insert row in USERS table with id: `,customer.insertId);
      result(null, { message: "User created" });
      return;
    };
    if (newCustomer.role == 1) {
      const [rowsMaster,fields] = await sql.promisePool.query(`INSERT INTO masters (id) VALUES (${customer.insertId});`);
      if (DEBUG) console.log(`[NewCustomer-Module] - Success Insert row in MASTERS table with id: `,customer.insertId);
      result(null, { message: "Master created" });
    };
  } catch (e){
    result(e, null);
  };
};

//карточка мастера
Customer.findById = async (customerId, result) => {
  if (DEBUG) console.log(`[Find-Master-By-Id-Module] - Recive master id = `,customerId);
  const [master,fieldsmaster] = await sql.promisePool.query(`SELECT logins.id, masters.firstname, masters.lastname, citys.city as city, TIMESTAMPDIFF(YEAR,masters.birthdate,CURDATE()) AS age, education.title as education, masters.experience, masters.price, masters.info, photo from logins left join masters using(id) left JOIN citys ON (masters.city_id=citys.id) left JOIN education ON (masters.education_id=education.id) where logins.id = ${customerId};`);
  const [joblist,fieldsjoblist] = await sql.promisePool.query(`SELECT group_concat(joblist.title order by joblist.title) as jobs FROM master_joblist INNER JOIN joblist ON (master_joblist.joblist_id=joblist.id) where master_id = ${customerId};`);
  if (master.length) {
    if (DEBUG) console.log(`[Find-Master-By-Id-Module] - Master found with id = ${customerId}`);
    master[0].jobs = (joblist[0].jobs).split(',');
    result(null, master[0]);
    return;
  }
  if (DEBUG) console.log(`[Find-Master-By-Id-Module] - Master not found id = ${customerId}`);
    result({ kind: "not_found" }, null);
};

//полечение всех мастеров
Customer.getAllMasters = async result => {
  const [masters,fieldsmasters] = await sql.promisePool.query("SELECT masters.id, firstname, lastname, TIMESTAMPDIFF(YEAR,birthdate,CURDATE()) AS age, education.title as education, experience, price, info, citys.city as city, photo FROM masters left JOIN citys ON (masters.city_id=citys.id) left JOIN education ON (masters.education_id=education.id);");
  const [joblists,fieldsjoblist] = await sql.promisePool.query(`SELECT master_id, group_concat(joblist.title order by joblist.title) as jobs FROM master_joblist INNER JOIN joblist ON (master_joblist.joblist_id=joblist.id) group by master_id;`);
  if (masters.length && joblists.length) {
    if (DEBUG) console.log(`[Get-All-Masters-Module] - Start Build Masters List with Job's`);
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
  if (DEBUG) console.log(`[Get-All-Citys-Module] - Start Build Citys List`);
  const [rows,fields] = await sql.promisePool.query("SELECT * From citys ORDER by id;");
  result(null, rows);
};

//полечение всех категорий и подкатегорий
Customer.getAllCategory = async result => {
  if (DEBUG) console.log(`[Get-All-Categorys-Module] - Start Build Categorys List`);
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