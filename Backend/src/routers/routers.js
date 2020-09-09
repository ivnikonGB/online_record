//file version 1.1.0
const passport = require('passport');
const { UI } = require('../config/server.config');
const path = require('path');

//validate Empty JSON
const validateEmptyJSON = (req, res, next) => {
  console.log(req.body);
    console.log(`Get keys JSON:\n${Object.keys(req.body)}`);
      if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            error: "Пустое значение!"
        });
      };
    next();
};

module.exports = app => {
  const customers = require("../controllers/conrollers");
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    if(UI){
      res.redirect('/api/v1/login');
    } else{
      res.status(401).json({ message: "Unauthorized" }); 
    };   
  };
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      if(UI){
        res.redirect('/api/v1/index');
      } else{
        res.status(401).json({ message: "Unauthorized" }); 
      };  
      return;
    }
    next()
  };

  // Authentication
  app.get("/api/v1/login", checkNotAuthenticated, (req,res)=>{
    if(UI){
      res.sendFile(path.resolve(__dirname, '../../html/login.html'));
    } else{
      res.json({ message: "/api/v1/login" }); 
    };
  });

  app.post('/api/v1/login', checkNotAuthenticated, function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if(UI)  {
        if (err) { return next(err); };
        if (!user) { return res.redirect('/api/v1/login'); };
        req.logIn(user, function(err) {
        if (err) { return next(err); };
        return res.redirect('/api/v1/index');
        });
      } else {
          if (err) { return next(err); };
          if (!user) { return res.status(401).json(info); };
          req.logIn(user, function(err) {
          if (err) { return next(err); };
          return res.status(200).json(info);
        }); 
      };
    })(req, res, next);
  });

  // Logout
  app.get('/api/v1/logout',checkAuthenticated, (req, res) => {
    req.logout();
    if(UI){
      res.redirect('/api/v1/login');
    } else{
      res.status(200).json({ message: "logget off" }); 
    };
  });
    
  //Register
  app.get("/api/v1/register", checkNotAuthenticated, (req,res)=>{
    if(UI){
      res.sendFile(path.resolve(__dirname, '../../html/register.html'));
    } else{
      res.json({ message: "/api/v1/register" }); 
    };
  });

  app.post("/api/v1/register", validateEmptyJSON, customers.newUser);

  //User pages
  app.get("/api/v1/index", checkAuthenticated, (req,res)=>{
    if(UI){
      res.sendFile(path.resolve(__dirname, '../../html/index.html'));
    } else{
      res.json({ message: "/api/v1/index" }); 
    };
    
  });

  //get customers profile
  app.get("/api/v1/profile", checkAuthenticated,  customers.getCustomerProfile);

  //update user profile
  //UI for test
  app.get("/api/v1/profile/userupdate", checkAuthenticated, (req,res)=>{
    if(UI){
      res.sendFile(path.resolve(__dirname, '../../html/userupdate.html'));
    } else{
      res.json({ message: "/api/v1/userupdate" }); 
    };
  });

  app.post("/api/v1/profile/userupdate", checkAuthenticated,  customers.updateUserProfile);

  //update master profile
  //UI for test
  app.get("/api/v1/profile/masterupdate", checkAuthenticated, (req,res)=>{
    if(UI){
      res.sendFile(path.resolve(__dirname, '../../html/masterupdate.html'));
    } else{
      res.json({ message: "/api/v1/masterupdate" }); 
    };
  });

  //update master profile
  app.post("/api/v1/profile/masterupdate", checkAuthenticated,  customers.updateMasterProfile);
  //update master jobs profile
  app.post("/api/v1/profile/masterupdate/jobs", checkAuthenticated,  customers.updateMasterProfileJobs);
  //reset password
  app.post("/api/v1/profile/resetpwd", checkAuthenticated,  customers.resetPwd);

  //Get All masters
  app.get("/api/v1/master", checkAuthenticated, customers.findAllMasters);

  //master info card
  app.get("/api/v1/master/:customerId",checkAuthenticated, customers.findOne);

  //category list
  app.get("/api/v1/search", checkAuthenticated, customers.getCategory);

  //citys list
  app.get("/api/v1/citys", checkAuthenticated, customers.getCitys);
};

