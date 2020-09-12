//file version 1.1.0
const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const sql = require('../models/db');

module.exports = async function(passport) {
    
    passport.use(
      new LocalStrategy({ usernameField: 'email', passwordField: 'pwd'}, async (email, pwd, done) => {
        let userObj;
        try {
            const [user,fields] = await sql.promisePool.query(`SELECT id, email, pwd, role from logins where email = '${email}';`);
            userObj = user[0];  
        } catch (e) {
            console.log(e); 
        };
        if(!userObj){
            return done(null, false, { message: 'Login incorrect!' });
        };
        bcryptjs.compare(pwd, userObj.pwd, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                console.log(`Password corect!`);
                return done(null, userObj, { id: userObj.id, role: userObj.role });
            } else {
                console.log(`Password incorect!`);
                return done(null, false, { message: 'Password incorrect' });
            }
        });
      })
    );
  
    passport.serializeUser(function(userObj, done) {
      done(null, {id: userObj.id, role: userObj.role});
    });
  
    passport.deserializeUser(async function({id, role}, done) {
        try {
        const [user,fieldsmaster] = await sql.promisePool.query(`SELECT id, email, pwd, role from logins where id = '${id}';`);
        done(null, user[0]);
        } catch (e) {
            console.log(`Can't deserialize user`);
            console.log(e);
        };
    });
  };
