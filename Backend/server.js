//file version 1.1.0
const serverConfig = require("./src/config/server.config");  
const express = require('express'); 
const app = express();
const passport = require('passport');
const session = require('express-session');

// Passport Config
require('./src/auth/passport')(passport);

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

 // Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());   
//---

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

app.use(allowCrossDomain)
app.get("/api/v1", async (req, res) => {
    res.json({ message: "API v1" });
});

require("./src/routers/routers")(app);

app.listen(serverConfig.PORT, () => {
    console.log(`[1] - Server start on port: ${serverConfig.PORT}`);
});
