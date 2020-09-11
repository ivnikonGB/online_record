//file version 1.1.0
const sql = require('./db');
const bcryptjs = require('bcryptjs');

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
   //console.log("getcustomer",getcustomer);
    if(getcustomer.role == 0){
        try{
        const [getUser,fields] = await sql.promisePool.query(`SELECT logins.id, logins.role, logins.email, logins.phone, firstname, lastname, city_id from logins left join users using(id) where logins.id = ${getcustomer.id};`);
        result(null, getUser[0]);
        return;
        } catch(e) {
        result(e, null);
        return;
        };
    };
    if(getcustomer.role == 1){
        try{
        const [getMaster,fields] = await sql.promisePool.query(`SELECT logins.id, logins.role, logins.email, logins.phone, masters.firstname, masters.lastname, city_id, DATE_FORMAT(birthdate, "%Y-%c-%e") as birthdate, education_id, masters.experience, masters.price, masters.info, photo from logins left join masters using(id) where logins.id = ${getcustomer.id};`);
        const [joblist,fieldsjoblist] = await sql.promisePool.query(`SELECT group_concat(joblist.title order by joblist.title) as jobs FROM master_joblist INNER JOIN joblist ON (master_joblist.joblist_id=joblist.id) where master_id = ${getcustomer.id};`);
            if (getMaster.length) {
                getMaster[0].jobs = (joblist[0].jobs).split(',');
                result(null, getMaster[0]);
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
     if(userProfile.role == 0){
         try{
         const [updateUser,fields] = await sql.promisePool.query(`UPDATE users SET firstname = '${userProfile.firstname}', lastname = '${userProfile.lastname}', city_id = '${userProfile.city_id}' WHERE (id = '${userProfile.id}');`);
         result(null, {message:"Update successful"});
         } catch(e) {
         result({ sqlerror: e}, null);
         return;
         };
     } else {
        result({message:"Update fail, wrong user role"}, null);
        return;
     };
    
   };

     //master profile
     MasterProfile.updateMaster = async (masterProfile, result) => {
     if(masterProfile.role == 1){
         try{
         const [updateMaster,fields] = await sql.promisePool.query(`UPDATE masters SET firstname = '${masterProfile.firstname}', lastname = '${masterProfile.lastname}', birthdate = '${masterProfile.birthdate}', city_id = '${masterProfile.city_id}', education_id = '${masterProfile.education_id}', experience = '${masterProfile.experience}', price = '${masterProfile.price}', info = '${masterProfile.info}' WHERE (id = '${masterProfile.id}');`);
         result(null, {message:"Update successful"});
         } catch(e) {
         result({ sqlerror: e}, null);
         return;
         };
     } else {
        result({message:"Update fail, wrong user role"}, null);
        return;
     };
    
   };

   //master profile
   MasterProfileJobs.updateMasterJobs = async (masterProfileJobs, result) => {
    let sqlJobValues = "";
     if(masterProfileJobs.role == 1){ 
        for (job of masterProfileJobs.jobs) {
            sqlJobValues = sqlJobValues + `('${masterProfileJobs.id}', ${job}),`;
        };
         try{
            const [removeMasterJobs,fieldsremove] = await sql.promisePool.query(`DELETE FROM master_joblist WHERE (master_id = '${masterProfileJobs.id}');`);
            const [updateMasterJobs,fieldsupdate] = await sql.promisePool.query(`INSERT master_joblist(master_id, joblist_id) VALUES ${sqlJobValues.slice(0, -1)};`);
            result(null, {message:"Update successful"});
         } catch(e) {
         result({ sqlerror: e}, null);
         return;
         };
     } else {
        result({message:"Update fail, wrong user role"}, null);
        return;
     };
    
   };

   
 //reset password
 CustomerNewPasswor.resetCustomerPassword = async (resetPwd, result) => {
    if(resetPwd.id != resetPwd.session_id || resetPwd.role != resetPwd.session_role){
        result({message:"Reset fail, wrong user or role"}, null);
        return;
    };
    if (resetPwd.newpwd1 != resetPwd.newpwd2){
        result({message:"New password not match"}, null);
        return;
    } else {
        if (resetPwd.newpwd1 == resetPwd.oldpwd){
            result({message:"New password can't be same as old password"}, null);
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
            if (err) throw err;
            if (isMatch) {
                let newPwd = await bcryptjs.hash(resetPwd.newpwd1, 10);
                const [updatePwd,fields] = await sql.promisePool.query(`UPDATE logins SET pwd = '${newPwd}' WHERE (id = '${resetPwd.id}');`);
                result(null, {message:"Password updated"});
            } else {
                result({message:"Wrong password"}, null);
                return;
            }
        });
   };

module.exports = {CustomerSession, UserProfile, MasterProfile, MasterProfileJobs, CustomerNewPasswor};
