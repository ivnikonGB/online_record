//file version 1.1.2
const sql = require('./db');
const bcryptjs = require('bcryptjs');
const { DEBUG } = require('../config/server.config');

const CustomerSession = function(customerSession) {
    this.id = customerSession.id;
    this.role = customerSession.role;
};

const UserProfile = function(userProfile) {
    this.id = userProfile.id;
    this.role = userProfile.role;
    this.firstname = userProfile.firstname;
    this.lastname = userProfile.lastname;
    this.city_id = userProfile.city_id;
};

const MasterProfile = function(masterProfile) {
    this.id = masterProfile.id;
    this.role = masterProfile.role;
    this.firstname = masterProfile.firstname;
    this.lastname = masterProfile.lastname;
    this.birthdate = masterProfile.birthdate;
    this.city_id = masterProfile.city_id;
    this.education_id = masterProfile.education_id;
    this.experience = masterProfile.experience;
    this.price = masterProfile.price;
    this.info = masterProfile.info;
   // this.photo = masterProfile.photo;
};

const MasterProfileJobs= function(masterProfileJobs) {
    this.id = masterProfileJobs.id;
    this.role = masterProfileJobs.role;
    this.jobs = masterProfileJobs.jobs;
};

const CustomerNewPasswor = function(newPassword) {
    this.session_id = newPassword.session_id;
    this.session_role = newPassword.session_role;
    this.id = newPassword.id;
    this.role = newPassword.role;
    this.oldpwd = newPassword.oldpwd;
    this.newpwd1 = newPassword.newpwd1;
    this.newpwd2 = newPassword.newpwd2;
};

//customer profile
CustomerSession.getProfile = async (getcustomer, result) => {
    if (DEBUG) console.log(`[Get-Profile-Module] - Receive Customer id: `,getcustomer.id);
    if(getcustomer.role == 0){
        if (DEBUG) console.log(`[Get-Profile-Module] - Receive Customer Role: `,getcustomer.role);
        try{
        const [getUser,fields] = await sql.promisePool.query(`SELECT logins.id, logins.role, logins.email, logins.phone, firstname, lastname, city_id from logins left join users using(id) where logins.id = ${getcustomer.id};`);
        result(null, getUser[0]);
        if (DEBUG) console.log(`[Get-Profile-Module] - Find User: `,getUser[0]);
        return;
        } catch(e) {
        result(e, null);
        return;
        };
    };
    if(getcustomer.role == 1){
        try{
        if (DEBUG) console.log(`[Get-Profile-Module] - Receive Customer Role: `,getcustomer.role);
        const [getMaster,fields] = await sql.promisePool.query(`SELECT logins.id, logins.role, logins.email, logins.phone, masters.firstname, masters.lastname, city_id, DATE_FORMAT(birthdate, "%Y-%c-%e") as birthdate, education_id, masters.experience, masters.price, masters.info, photo from logins left join masters using(id) where logins.id = ${getcustomer.id};`);
        const [joblist,fieldsjoblist] = await sql.promisePool.query(`SELECT group_concat(joblist.title order by joblist.title) as jobs FROM master_joblist INNER JOIN joblist ON (master_joblist.joblist_id=joblist.id) where master_id = ${getcustomer.id};`);
            if (getMaster.length) {
                getMaster[0].jobs = (joblist[0].jobs).split(',');
                result(null, getMaster[0]);
                if (DEBUG) console.log(`[Get-Profile-Module] - Find Master: `,getMaster[0]);
                return;
            }       
        } catch(e) {
        result(e, null);
        return;
        };
    };
  };


  //user profile
  UserProfile.updateUser = async (userProfile, result) => {
        if (DEBUG) console.log(`[Update-User-Profile-Module] - Receive Customer New data: `,userProfile);
        if(userProfile.role == 0){
            if (DEBUG) console.log(`[Update-User-Profile-Module] - Receive Role: `,userProfile.role);
                try{
                const [updateUser,fields] = await sql.promisePool.query(`UPDATE users SET firstname = '${userProfile.firstname}', lastname = '${userProfile.lastname}', city_id = '${userProfile.city_id}' WHERE (id = '${userProfile.id}');`);
                result(null, {message:"Update successful"});
                if (DEBUG) console.log(`[Update-User-Profile-Module] - Update successful`);
                } catch(e) {
                result({ sqlerror: e}, null);
                return;
                };
        } else {
            result({message:"Update fail, wrong user role"}, null);
            if (DEBUG) console.log(`[Update-User-Profile-Module] - Update fail, wrong user role`);
            return;
        };
   };

     //master profile
     MasterProfile.updateMaster = async (masterProfile, result) => {
    if (DEBUG) console.log(`[Update-Master-Profile-Module] - Receive Customer New data: `,masterProfile);
     if(masterProfile.role == 1){
        if (DEBUG) console.log(`[Update-Master-Profile-Module] - Receive Role: `,masterProfile.role);
         try{
         const [updateMaster,fields] = await sql.promisePool.query(`UPDATE masters SET firstname = '${masterProfile.firstname}', lastname = '${masterProfile.lastname}', birthdate = '${masterProfile.birthdate}', city_id = '${masterProfile.city_id}', education_id = '${masterProfile.education_id}', experience = '${masterProfile.experience}', price = '${masterProfile.price}', info = '${masterProfile.info}' WHERE (id = '${masterProfile.id}');`);
         result(null, {message:"Update successful"});
         if (DEBUG) console.log(`[Update-Master-Profile-Module] - Update successful`);
         } catch(e) {
         result({ sqlerror: e}, null);
         return;
         };
     } else {
        result({message:"Update fail, wrong user role"}, null);
        if (DEBUG) console.log(`[Update-Master-Profile-Module] - Update fail, wrong user role`);
        return;
     };
    
   };

   //master profile
   MasterProfileJobs.updateMasterJobs = async (masterProfileJobs, result) => {
    if (DEBUG) console.log(`[Update-Master-Jobs-Module] - Receive Master Jobs Array: `,masterProfileJobs);
    let sqlJobValues = "";
     if(masterProfileJobs.role == 1){ 
        if (DEBUG) console.log(`[Update-Master-Jobs-Module] - Customer is Master, start update roles`);
        for (job of masterProfileJobs.jobs) {
            sqlJobValues = sqlJobValues + `('${masterProfileJobs.id}', ${job}),`;
        };
         try{
            const [removeMasterJobs,fieldsremove] = await sql.promisePool.query(`DELETE FROM master_joblist WHERE (master_id = '${masterProfileJobs.id}');`);
            const [updateMasterJobs,fieldsupdate] = await sql.promisePool.query(`INSERT master_joblist(master_id, joblist_id) VALUES ${sqlJobValues.slice(0, -1)};`);
            result(null, {message:"Update successful"});
            if (DEBUG) console.log(`[Update-Master-Jobs-Module] - Update Roles successful`);
         } catch(e) {
         result({ sqlerror: e}, null);
         return;
         };
     } else {
        result({message:"Update fail, wrong user role"}, null);
        if (DEBUG) console.log(`[Update-Master-Jobs-Module] - Update fail, wrong user role`);
        return;
     };
    
   };

   
 //reset password
 CustomerNewPasswor.resetCustomerPassword = async (resetPwd, result) => {
    if (DEBUG) console.log(`[Update-Password-Module] - Recive new password data`,resetPwd);
    if(resetPwd.id != resetPwd.session_id || resetPwd.role != resetPwd.session_role){
        result({message:"Reset fail, wrong user or role"}, null);
        if (DEBUG) console.log(`[Update-Password-Module] - Reset fail, wrong user or role`);
        return;
    };
    if (resetPwd.newpwd1 != resetPwd.newpwd2){
        result({message:"Reset fail, New password not match"}, null);
        if (DEBUG) console.log(`[Update-Password-Module] - Reset fail,New password not match`);
        return;
    } else {
        if (resetPwd.newpwd1 == resetPwd.oldpwd){
            result({message:"New password can't be same as old password"}, null);
            if (DEBUG) console.log(`[Update-Password-Module] - Reset fail, New password can't be same as old password`);
            return;
        };
    };
    let oldcustomerPwd = "";
    try {
        const [user,fields] = await sql.promisePool.query(`SELECT pwd from logins where id = '${resetPwd.session_id}';`);
        oldcustomerPwd = user[0].pwd; 
    } catch (e) {
        console.log('[Reset password modeule] => sql error: ',e); 
        result({message:"Error find user"}, null);
        return;
    };
    bcryptjs.compare(resetPwd.oldpwd, oldcustomerPwd, async (err, isMatch) => {
            if (DEBUG) console.log(`[Update-Password-Module] - Password is match`);
            if (err) throw err;
            if (isMatch) {
                let newPwd = await bcryptjs.hash(resetPwd.newpwd1, 10);
                const [updatePwd,fields] = await sql.promisePool.query(`UPDATE logins SET pwd = '${newPwd}' WHERE (id = '${resetPwd.id}');`);
                result(null, {message:"Password updated"});
                if (DEBUG) console.log(`[Update-Password-Module] - Password updated`);
            } else {
                result({message:"Wrong password"}, null);
                if (DEBUG) console.log(`[Update-Password-Module] - Current password not match`);
                return;
            }
        });
   };

module.exports = {CustomerSession, UserProfile, MasterProfile, MasterProfileJobs, CustomerNewPasswor};
