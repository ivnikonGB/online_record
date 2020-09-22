//file version 1.1.1
const sql = require('./db');
const moment = require("moment");
const { DEBUG } = require('../config/server.config');

const NewOrder = function(newOrder) {
    this.session_id = newOrder.session_id;
    this.masterid = newOrder.masterid;
    this.userid = newOrder.userid;
    this.jobid = newOrder.jobid;
    this.date = newOrder.date;
    if(newOrder.comment){
        this.comment = newOrder.comment;
    };   
};

const GetOrder = function(getOrder) {
    this.session_id = getOrder.session_id;
    this.session_role = getOrder.session_role;
    if(getOrder.date){
        this.date = getOrder.date;
    } else {
        if(getOrder.start_date && getOrder.end_date){
            this.start_date = getOrder.start_date;
            this.end_date = getOrder.end_date;
        };   
    };
};

//new order
NewOrder.createNewOrder = async (newOrderRequest, result) => {
    if (DEBUG) console.log(`[New-Order-Module] - Recive new order data:`,newOrderRequest);
    if(newOrderRequest.userid != newOrderRequest.session_id || newOrderRequest.userid == newOrderRequest.masterid){
        result({message:"Fail create order, wrong user"}, null);
        if (DEBUG) console.log(`[New-Order-Module] - Fail create order, wrong user`);
        return;
    };
    let checkIsMaster;
    try{
        const [isMaster,fields] = await sql.promisePool.query(`SELECT role FROM logins WHERE id = '${newOrderRequest.masterid}';`);
        checkIsMaster = isMaster[0].role;
        if (!checkIsMaster){
            result({message:"Fail create order, wrong master role"}, null);
            if (DEBUG) console.log(`[New-Order-Module] - Fail create order, wrong master role`);
            return;
        };
        if(newOrderRequest.comment){
            const [newOrderOutput,fields] = await sql.promisePool.query(`INSERT INTO orders (user_id, master_id, service_type, service_start_date, comment) VALUES ('${newOrderRequest.userid}', '${newOrderRequest.masterid}', '${newOrderRequest.jobid}', '${newOrderRequest.date}', '${newOrderRequest.comment}');`);
            result(null, {orderid: newOrderOutput.insertId});
            if (DEBUG) console.log(`[New-Order-Module] - New Order Created with comment field`);
        } else {
            const [newOrderOutputNoComment,fields] = await sql.promisePool.query(`INSERT INTO orders (user_id, master_id, service_type, service_start_date) VALUES ('${newOrderRequest.userid}', '${newOrderRequest.masterid}', '${newOrderRequest.jobid}', '${newOrderRequest.date}');`);
            result(null, {orderid: newOrderOutputNoComment.insertId});
            if (DEBUG) console.log(`[New-Order-Module] - New Order Created without comment field`);
        };
         
         
    } catch(e) {
         result({ sqlerror: e}, null);
         return;
     };
};


GetOrder.getCustomersOrders = async (getOrdersRequest, result) => {
    if (DEBUG) console.log(`[Get-Order-Module] - Recive get order data:`,getOrdersRequest);
    //get orders on single date
    //if date key
    if(getOrdersRequest.date){
        if (DEBUG) console.log(`[Get-Order-Module] - Find DATA key in JSON, search jobs on single date: `,getOrdersRequest.date);
        try{ 
            //if master
            if(getOrdersRequest.session_role){
                if (DEBUG) console.log(`[Get-Order-Module] - Current customer is Master`);
                const [masterOrderOutput,fields] = await sql.promisePool.query(`SELECT orders.id, orders.user_id, users.firstname, users.lastname, job_id,joblist.title as job_title,DATE_FORMAT(job_date, '%Y-%m-%e %H:%i') as job_date,comment from orders left JOIN users ON (orders.user_id=users.id) left JOIN joblist ON (orders.job_id=joblist.id) where master_id = '${getOrdersRequest.session_id}' AND job_date LIKE '${getOrdersRequest.date}%' ORDER BY job_date;`);
                result(null, masterOrderOutput);
                return;
            };
                //then user
                if (DEBUG) console.log(`[Get-Order-Module] - Current customer is User`);
                const [userOrderOutput,fields] = await sql.promisePool.query(`SELECT orders.id, orders.master_id, masters.firstname, masters.lastname, job_id,joblist.title as job_title,DATE_FORMAT(job_date, '%Y-%m-%e %H:%i') as job_date,comment from orders left JOIN masters ON (orders.master_id=masters.id) left JOIN joblist ON (orders.job_id=joblist.id) where user_id = '${getOrdersRequest.session_id}' AND job_date LIKE '${getOrdersRequest.date}%' ORDER BY job_date;`);
                result(null, userOrderOutput);
                return;
            
        } catch(e) {
            result({ sqlerror: e}, null);
            return;
        };
    };
    //get orders between dates
    if(getOrdersRequest.start_date && getOrdersRequest.end_date){
        if (DEBUG) console.log(`[Get-Order-Module] - Find start & end date in JSON, search jobs between ${getOrdersRequest.start_date} and ${getOrdersRequest.end_date}`);
        try{ 
            //if master
            if(getOrdersRequest.session_role){
                if (DEBUG) console.log(`[Get-Order-Module] - Current customer is Master`);
                const [masterOrderOutput,fields] = await sql.promisePool.query(`SELECT orders.id, orders.user_id, users.firstname, users.lastname, job_id,joblist.title as job_title,DATE_FORMAT(job_date, '%Y-%m-%e %H:%i') as job_date,comment from orders left JOIN users ON (orders.user_id=users.id) left JOIN joblist ON (orders.job_id=joblist.id) where master_id = '${getOrdersRequest.session_id}' and job_date BETWEEN '${getOrdersRequest.start_date}%' AND '${getOrdersRequest.end_date + ' 23:59:59'}%' order by job_date;`);
                result(null, masterOrderOutput);
                return;
            };
                //then user
                if (DEBUG) console.log(`[Get-Order-Module] - Current customer is User`);
                const [userOrderOutput,fields] = await sql.promisePool.query(`SELECT orders.id, orders.master_id, masters.firstname, masters.lastname, job_id,joblist.title as job_title,DATE_FORMAT(job_date, '%Y-%m-%e %H:%i') as job_date,comment from orders left JOIN masters ON (orders.master_id=masters.id) left JOIN joblist ON (orders.job_id=joblist.id) where user_id = '${getOrdersRequest.session_id}' and job_date BETWEEN '${getOrdersRequest.start_date}%' AND '${getOrdersRequest.end_date + ' 23:59:59'}%' order by job_date;`);
                result(null, userOrderOutput);
                return;
            
        } catch(e) {
            result({ sqlerror: e}, null);
            return;
        };
    };

    //default select orders
    try{ 
        //if master
        if (DEBUG) console.log(`[Get-Order-Module] - Not find data keys in JSON, get default search from 30 days`,getOrdersRequest);
        if(getOrdersRequest.session_role){
            if (DEBUG) console.log(`[Get-Order-Module] - Current customer is Master`);
            const [masterOrderOutput,fields] = await sql.promisePool.query(`SELECT orders.id, orders.user_id, users.firstname, users.lastname, job_id,joblist.title as job_title,DATE_FORMAT(job_date, '%Y-%m-%e %H:%i') as job_date,comment from orders left JOIN users ON (orders.user_id=users.id) left JOIN joblist ON (orders.job_id=joblist.id) where master_id = '${getOrdersRequest.session_id}' and job_date BETWEEN '${moment().subtract(6, 'days').format('YYYY-MM-DD')}' AND '${moment().add(25, 'days').format('YYYY-MM-DD')}' order by job_date;`);
            result(null, masterOrderOutput);
            return;
        };
            //then user
            if (DEBUG) console.log(`[Get-Order-Module] - Current customer is User`);
            const [userOrderOutput,fields] = await sql.promisePool.query(`SELECT orders.id, orders.master_id, masters.firstname, masters.lastname, job_id,joblist.title as job_title,DATE_FORMAT(job_date, '%Y-%m-%e %H:%i') as job_date,comment from orders left JOIN masters ON (orders.master_id=masters.id) left JOIN joblist ON (orders.job_id=joblist.id) where user_id = '${getOrdersRequest.session_id}' and job_date BETWEEN '${moment().subtract(6, 'days').format('YYYY-MM-DD')}' AND '${moment().add(25, 'days').format('YYYY-MM-DD')}' order by job_date;`);
            result(null, userOrderOutput);
            return;
        
    } catch(e) {
        result({ sqlerror: e}, null);
        return;
    };
  };

module.exports = {NewOrder, GetOrder};