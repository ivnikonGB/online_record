//file version 1.1.2
const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const sql = require('../models/db');
const { DEBUG } = require('../config/server.config');

module.exports = async function(passport) {
    
    passport.use(
      new LocalStrategy({ usernameField: 'email', passwordField: 'pwd'}, async (email, pwd, done) => {
        if (DEBUG) console.log(`[Auth-Module] - Receive Email:`,email);
        if (DEBUG) console.log(`[Auth-Module] - Receive pwd:`,pwd);
        let userObj;
        try {
            const [user,fields] = await sql.promisePool.query(`SELECT id, email, pwd, role from logins where email = '${email}';`);
            userObj = user[0]; 
            if (DEBUG) console.log(`[Auth-Module] - SQL User found:`,userObj);
        } catch (e) {
            console.log(e); 
        };
        if(!userObj){
            if (DEBUG) console.log('[Auth-Module] - User not found in database!');
            return done(null, false, { message: 'Login incorrect!' });
           
        };
        bcryptjs.compare(pwd, userObj.pwd, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                if (DEBUG) console.log(`[Auth-Module] - Hash passowrd correct`);
                return done(null, userObj, { id: userObj.id, role: userObj.role });
            } else {
                if (DEBUG) console.log(`[Auth-Module] - Hash passowrd incorect!`);
                return done(null, false, { message: 'Password incorrect' });
            }
        });
      })
    );
  
    passport.serializeUser(function(userObj, done) {
        if (DEBUG) console.log(`[Auth-Module] - Serialize user`);
      done(null, {id: userObj.id, role: userObj.role});
    });
  
    passport.deserializeUser(async function({id, role}, done) {
        try {
        const [user,fieldsmaster] = await sql.promisePool.query(`SELECT id, email, pwd, role from logins where id = '${id}';`);
        if (DEBUG) console.log(`[Auth-Module] - Deserialize user`);
        done(null, user[0]);
        } catch (e) {
            console.log(`Can't deserialize user`);
            console.log(e);
        };
    });
  };
