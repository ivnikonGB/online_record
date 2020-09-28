//file version 1.1.2
const Customer = require('../models/user.model');
const {CustomerSession, UserProfile, MasterProfile, MasterProfileJobs, CustomerNewPasswor} = require('../models/profile.model');
//const {NewOrder, GetOrder, GetOrderById, UpdateOrderById} = require('../models/order.model');
const {NewOrder, GetOrder, GetOrderById} = require('../models/order.model');
const { UI } = require('../config/server.config');

//new user
exports.newUser = async (req, res) => {
  const customer = new Customer({
    email: req.body.email,
    pwd: req.body.pwd,
    role: req.body.role
  });
  
  //create user
 await Customer.create(customer, (err, data) => {
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
exports.findOne = async (req, res) => {
  await Customer.findById(req.params.customerId, (err, data) => {
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


exports.getCustomerProfile = async (req, res) => {
  const getsession = new CustomerSession({
    id: req.session.passport.user.id,
    role: req.session.passport.user.role
  });

  //get user profile
  await CustomerSession.getProfile(getsession, (err, data) => {
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

exports.updateUserProfile = async (req, res) => {
  const userProfile = new UserProfile({
    id: req.session.passport.user.id,
    role: req.session.passport.user.role,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    city_id: req.body.city_id
  });

  //get user profile
  await UserProfile.updateUser(userProfile, (err, data) => {
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

exports.updateMasterProfile = async (req, res) => {
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

  //get master profile
  await MasterProfile.updateMaster(masterProfile, (err, data) => {
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

exports.updateMasterProfileJobs = async (req, res) => {
  const masterProfileJobs = new MasterProfileJobs({
    id: req.session.passport.user.id,
    role: req.session.passport.user.role,
    jobs: req.body.jobs
  });
  //get master profile
 await MasterProfileJobs.updateMasterJobs(masterProfileJobs, (err, data) => {
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

exports.resetPwd = async (req, res) => {
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
  await CustomerNewPasswor.resetCustomerPassword(customerNewPasswor, (err, data) => {
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
//new order
exports.newOrder = async (req, res) => {

  const customerNewOrder = new NewOrder({
    session_id: req.session.passport.user.id,
    //session_role: req.session.passport.user.role,
    userid: req.body.userid,
    masterid: req.body.masterid,
    jobid: req.body.jobid,
    date: req.body.date,
    comment: req.body.comment
  });

  //get master profile
   await NewOrder.createNewOrder(customerNewOrder, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "error"
      })
    } else {
      res.status(201).json(data); 
  }
  });
};

//get order
exports.getOrders = (req, res) => {
  
  const getCustomersOrders = new GetOrder({
    session_id: req.session.passport.user.id,
    session_role: req.session.passport.user.role,
    date: req.body.date,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  });

    GetOrder.getCustomersOrders(getCustomersOrders, (err, data) => {
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

exports.getOrderById = (req, res) => {
  
  const getOrderById = new GetOrderById({
    session_id: req.session.passport.user.id,
    session_role: req.session.passport.user.role,
    orderid: req.params.orderId
  });

   GetOrderById.getOrder(getOrderById, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.orderId}.`
        });
        return;
      } else {
        res.status(500).send({
          message: "Error retrieving Order with id " + req.params.orderId
        });
        return;
      };
    } else {
        res.send(data)};
  });
};

// exports.updateOrderById = (req, res) => {
  
//   const updateOrderById = new UpdateOrderById({
//     session_id: req.session.passport.user.id,
//     session_role: req.session.passport.user.role,
//     orderid: req.params.orderId,
//     status_id: req.body.status_id,
//     job_date: req.body.job_date,
//     comment: req.body.comment
//   });

//   UpdateOrderById.updateOrder(updateOrderById,(err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Order with id ${req.params.orderId}.`
//         });
//         return;
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Order with id " + req.params.orderId
//         });
//         return;
//       };
//     } else {
//         //res.send(data)
//         res.sendStatus(201);
//       };
//   });
// };

