
const serverConfig = require("./src/config/server.config");  
const express = require('express'); 
const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
    
//---
app.get("/", async (req, res) => {
    res.json({ message: "root директория /" });
});

require("./src/routers/routers")(app);

app.listen(serverConfig.PORT, () => {
    console.log(`[1] - Сервер запущен на ${serverConfig.PORT} порту`);
});






