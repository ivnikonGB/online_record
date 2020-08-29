module.exports = app => {
  const customers = require("../controllers/conrollers");
  //Функция проверки на пустой json
  const validateEmptyJSON = (req, res, next) => {
      console.log(`Получены ключи JSON:\n${Object.keys(req.body)}`);
        if(Object.keys(req.body).length === 0) {
          return res.status(400).send({
              error: "Пустое значение!"
          });
        };
      //console.log(`Получены данные:\n${req.body}`);
      next();
  };

  //Регистрация пользователя
  app.post("/register/user", validateEmptyJSON, customers.newUser);
  //Регистрация мастера
  app.post("/register/master", validateEmptyJSON, customers.newMaster);
  // получить всех мастеров
  app.get("/master", customers.findAllMasters);
  //Карточка мастера
  app.get("/master/:customerId", customers.findOne);
  //список категорий
  app.get("/search", customers.getCategory);
  app.get("/citys", customers.getCitys);
};

