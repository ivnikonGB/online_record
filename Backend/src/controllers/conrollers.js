
const Customer = require('../models/user.model')
const Master = require('../models/master.model')

//========================User Control=====================
//Новый пользователь
exports.newUser = (req, res) => {
  const customer = new Customer({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    city_id: req.body.city_id,
    pwd: req.body.pwd
  });
  
  //создание пользователя
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error"
      });
    else res.send(data);
  });
};


//поиск всех мастеров
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

//карточка мастера
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

//поиск всех городов
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

//========================master Control=====================
//Новый мастер

exports.newMaster = (req, res) => {
  const customer = new Master({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    birthdate: req.body.birthdate,
    city_id: req.body.city_id,
    pwd: req.body.pwd
  });
  Master.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};