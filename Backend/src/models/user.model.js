//file version 1.0.1

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
  const [master,fieldsmaster] = await sql.promisePool.query(`SELECT masters.id, firstname, lastname, email, phone, TIMESTAMPDIFF(YEAR,birthdate,CURDATE()) AS age, education.title as education, experience, price, info, citys.city as city FROM masters INNER JOIN citys ON (masters.city_id=citys.id) INNER JOIN education ON (masters.education_id=education.id) where masters.id = ${customerId};`);
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
  const [masters,fieldsmasters] = await sql.promisePool.query("SELECT masters.id, firstname, lastname, email, phone, TIMESTAMPDIFF(YEAR,birthdate,CURDATE()) AS age, education.title as education, experience, price, info, citys.city as city FROM masters INNER JOIN citys ON (masters.city_id=citys.id) INNER JOIN education ON (masters.education_id=education.id);");
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