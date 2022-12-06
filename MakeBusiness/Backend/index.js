const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { dbConnection } = require('./database/config'); //Conexion hacia la base de datos

// Crear App
const app = express();


require("dotenv").config(); //Cargamos las variables de entorno.

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

dbConnection();
app.use(express.static('public'));





app.get("/", (req, res) =>{
    res.send("correcto")
})

app.use("/api/users", require('./routers/users.router'));
app.use("/api/plans", require('./routers/plan.router'));
app.use("/api/companies", require('./routers/companies.router'));
app.use("/api/files", require('./routers/files.router'));
app.use("/api/products", require('./routers/products.router'));
app.use("/api/uploads", require('./routers/uploads.router'));
app.use("/api/login", require('./routers/login.router'));


app.listen(process.env.PORT, () => {
    console.log("servidor levantado en el puerto: " + process.env.PORT)
})