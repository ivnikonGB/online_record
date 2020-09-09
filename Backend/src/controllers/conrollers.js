//file version 1.1.0
const Customer = require('../models/user.model');
const {CustomerSession, UserProfile, MasterProfile, MasterProfileJobs, CustomerNewPasswor} = require('../models/profile.model');
const { UI } = require('../config/server.config');

//new user
exports.newUser = (req, res) => {
  const customer = new Customer({
    email: req.body.email,
    pwd: req.body.pwd,
    role: req.body.role
  });
  
  //create user
  Customer.create(customer, (err, data) => {
    if (err){
      if(err.message.includes('Duplicate entry')){
        res.status(400).send({ message: "User already exist"});
        return;
      } else {
      res.status(500).send({message: err.message || "error" });
      return;
      };

    } else {
    // res.send(data);
    if(UI){
      res.redirect('/api/v1/login');
    } else{
      res.status(201).json(data); 
    };
  }
  });


};


//find All Masters
exports.findAllMasters = async (req, res) => {
  await Customer.getAllMasters((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error"
      });
    else res.send(data);
  });
};
//get All Category
exports.getCategory = async (req, res) => {
  await Customer.getAllCategory((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error"
      });
    else res.json(data);
  });
};

//master info card
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
        return;
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
        return;
      }
    } else {
        res.send(data)};
  });
};

//get all citys
exports.getCitys = async (req, res) => {
  await Customer.getAllCitys((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error"
      });
    else res.send(data);
  });
};


exports.getCustomerProfile = (req, res) => {
  const getsession = new CustomerSession({
    id: req.session.passport.user.id,
    role: req.session.passport.user.role
  });

  //get user profile
  CustomerSession.getProfile(getsession, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "error"
      })
    } else {
      res.json(data); 
  }
  });
};

exports.updateUserProfile = (req, res) => {
  const userProfile = new UserProfile({
    id: req.session.passport.user.id,
    role: req.session.passport.user.role,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    city_id: req.body.city_id
  });
console.log('Conoller UserProfile', userProfile);
  //get user profile
  UserProfile.updateUser(userProfile, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "error"
      })
    } else {
      res.json(data); 
  }
  });
};

exports.updateMasterProfile = (req, res) => {
  const masterProfile = new MasterProfile({
    id: req.session.passport.user.id,
    role: req.session.passport.user.role,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    city_id: req.body.city_id,
    education_id: req.body.education_id,
    experience: req.body.experience,
    price: req.body.price,
    info: req.body.info//,
    //photo: req.body.photo
  });
console.log('Conoller UserProfile', masterProfile);
  //get master profile
  MasterProfile.updateMaster(masterProfile, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "error"
      })
    } else {
      res.json(data); 
  }
  });
};

exports.updateMasterProfileJobs = (req, res) => {
  const masterProfileJobs = new MasterProfileJobs({
    id: req.session.passport.user.id,
    role: req.session.passport.user.role,
    jobs: req.body.jobs
  });
  //get master profile
  MasterProfileJobs.updateMasterJobs(masterProfileJobs, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "error"
      })
    } else {
      res.json(data); 
  }
  });
};

exports.resetPwd = (req, res) => {
  const customerNewPasswor = new CustomerNewPasswor({
    session_id: req.session.passport.user.id,
    session_role: req.session.passport.user.role,
    id: req.body.id,
    role: req.body.role,
    oldpwd: req.body.oldpwd,
    newpwd1: req.body.newpwd1,
    newpwd2: req.body.newpwd2
  });
  //get master profile
  CustomerNewPasswor.resetCustomerPassword(customerNewPasswor, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "error"
      })
    } else {
      res.status(200).json(data); 
  }
  });
};

