//file version 1.1.2
const sql = require('./db');
const moment = require("moment");
const mysql = require('mysql2');
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

const GetOrderById = function(getOrderByid){
    this.session_id = getOrderByid.session_id;
    this.session_role = getOrderByid.session_role;
    this.orderid = getOrderByid.orderid;    
};

// const UpdateOrderById = function(updateOrderByid){
//     this.session_id = updateOrderByid.session_id;
//     this.session_role = updateOrderByid.session_role;
//     this.orderid = updateOrderByid.orderid;
//     this.query = {};
//     if(updateOrderByid.status_id){
//         this.query.status_id = updateOrderByid.status_id;
//     };
//     if(updateOrderByid.job_date){
//         this.query.job_date = updateOrderByid.job_date;
//     };
//     if(updateOrderByid.comment){
//         this.query.comment = updateOrderByid.comment;
//     };
// }

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

GetOrderById.getOrder = async(getOrderRequest, result) =>{
    if (DEBUG) console.log(`[Get-OrderById-Module] - Recive Role = ${getOrderRequest.session_role} CustomerID = ${getOrderRequest.session_id} OrderID = ${getOrderRequest.orderid}`);
    try{ 
        //if master
        if(getOrderRequest.session_role){
            if (DEBUG) console.log(`[Get-OrderById-Module] - Current customer is Master`);
            const [masterOrder,fields] = await sql.promisePool.query(`SELECT orders.id,users.firstname As firstname, users.lastname AS lastname,statuses.title AS 'status',create_date,accept_date,finish_date,joblist.title,job_date,'comment' FROM orders LEFT JOIN users ON (orders.user_id=users.id) LEFT JOIN statuses ON (orders.status_id=statuses.id) LEFT JOIN joblist ON (orders.job_id=joblist.id)where orders.id = '${getOrderRequest.orderid}' AND orders.master_id = '${getOrderRequest.session_id}';`);
            if(masterOrder[0]){
                if (DEBUG) console.log(`[Get-OrderById-Module] - Order found, see JSON result`);
                result(null, masterOrder[0]);
                return;
            };
            if (DEBUG) console.log(`[Get-OrderById-Module] - Order: ${getOrderRequest.orderid} not found`);
            result({ kind: "not_found"}, null);
            return;
        };
        //then user
        if (DEBUG) console.log(`[Get-OrderById-Module] - Current customer is User`);
        const [userOrder,fields] = await sql.promisePool.query(`SELECT orders.id,masters.firstname As firstname, masters.lastname AS lastname,statuses.title AS 'status',create_date,accept_date,finish_date,joblist.title,job_date,'comment' FROM orders LEFT JOIN masters ON (orders.master_id=masters.id) LEFT JOIN statuses ON (orders.status_id=statuses.id) LEFT JOIN joblist ON (orders.job_id=joblist.id)where orders.id = '${getOrderRequest.orderid}' AND orders.user_id = '${getOrderRequest.session_id}';`);
        if(userOrder[0]){
            if (DEBUG) console.log(`[Get-OrderById-Module] - Order found, see JSON result`);
            result(null, userOrder[0]);
            return;
        };
        if (DEBUG) console.log(`[Get-OrderById-Module] - Order: ${getOrderRequest.orderid} not found`);
        result({ kind: "not_found"}, null);
        return;
        
    } catch(e) {
        if (DEBUG) console.log(`[Get-OrderById-Module] - SQL Error:`);
        if (DEBUG) console.log(e);
        result("sqlerror", null);
        return;
    };
};


// UpdateOrderById.updateOrder = async(updateOrderRequest, result) =>{
//     if (DEBUG) console.log(`[Update-OrderById-Module] - Recive DATA: UserRole = ${updateOrderRequest.session_role}, UserId = ${updateOrderRequest.session_id}, status_id = ${updateOrderRequest.query.status_id}, job_date = ${updateOrderRequest.query.job_date}, comment = ${updateOrderRequest.query.comment};`);
//     //build sql query
//     let sqlrow = "UPDATE orders SET ? WHERE `id` = ?;";
//     let inserts = [updateOrderRequest.query, updateOrderRequest.orderid];
//     sqlrow = mysql.format(sqlrow, inserts);
//     if (DEBUG) console.log(`[Update-OrderById-Module] - MySQL Query with values: ${sqlrow}`);
  
//     // console.log(`sql `, sqlrow);
//     // const [masterOrder,fields] = await sql.promisePool.query(sqlrow);
//     // console.log(masterOrder.changedRows);
    
//     try{ 
//         //if master
//         if(updateOrderRequest.session_role){
//             if (DEBUG) console.log(`[Update-OrderById-Module] - Current customer is Master`);
//             const [masterOrder,fields] = await sql.promisePool.query(sqlrow);
//             if(masterOrder.changedRows){
//                 if (DEBUG) console.log(`[Update-OrderById-Module] - Order found, see JSON result`);
//                 result(null, 'ok');
//                 return;
//             };
//             if (DEBUG) console.log(`[Update-OrderById-Module] - Order: ${updateOrderRequest.orderid} not found`);
//             result({ kind: "not_found"}, null);
//             return;
//         };
//         //then user
//         // if (DEBUG) console.log(`[Update-OrderById-Module] - Current customer is User`);
//         // if(updateOrderRequest.query.status_id == 6){
//         //     console.log(typeof updateOrderRequest.query.status_id);
//         // }
//         // //build sql query
//         // let sqlrow = "UPDATE orders SET ? WHERE `id` = ?;";
//         // let inserts = [updateOrderRequest.query, updateOrderRequest.orderid];
//         // sqlrow = mysql.format(sqlrow, inserts);
//         // if (DEBUG) console.log(`[Update-OrderById-Module] - MySQL Query with values: ${sqlrow}`);

//         // const [userOrder,fields] = await sql.promisePool.query(sqlrow);
//         //     if(userOrder.changedRows){
//         //         if (DEBUG) console.log(`[Update-OrderById-Module] - Order found, see JSON result`);
//         //         result(null, 'ok');
//         //         return;
//         //     };
//         //     if (DEBUG) console.log(`[Update-OrderById-Module] - Order: ${updateOrderRequest.orderid} not found`);
//         //     result({ kind: "not_found"}, null);
//         //     return;

//         // const [userOrder,fields] = await sql.promisePool.query(`SELECT orders.id,masters.firstname As firstname, masters.lastname AS lastname,statuses.title AS 'status',create_date,accept_date,finish_date,joblist.title,job_date,'comment' FROM orders LEFT JOIN masters ON (orders.master_id=masters.id) LEFT JOIN statuses ON (orders.status_id=statuses.id) LEFT JOIN joblist ON (orders.job_id=joblist.id)where orders.id = '${getOrderRequest.orderid}' AND orders.user_id = '${getOrderRequest.session_id}';`);
//         // if(userOrder[0]){
//         //     if (DEBUG) console.log(`[Update-OrderById-Module] - Order found, see JSON result`);
//         //     result(null, userOrder[0]);
//         //     return;
//         // };
//         // if (DEBUG) console.log(`[Update-OrderById-Module] - Order: ${getOrderRequest.orderid} not found`);
//         // result({ kind: "not_found"}, null);
//         // return;
        
//     } catch(e) {
//         if (DEBUG) console.log(`[Update-OrderById-Module] - SQL Error:`);
//         if (DEBUG) console.log(e);
//         result("sqlerror", null);
//         return;
//     };
// };
//module.exports = {NewOrder, GetOrder, GetOrderById, UpdateOrderById};
module.exports = {NewOrder, GetOrder, GetOrderById};