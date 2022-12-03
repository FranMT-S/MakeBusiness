const mongoose = require("mongoose");

const dbConnection = async() => {
    try {
        //async await convierten a una promesa en un proceso sincrono (Espera a que se resulva para continuar ejecutandose)
        console.log(process.env.BD_CNN)
        await mongoose.connect(process.env.BD_CNN);
        console.log("BD Online");

    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializar la Base De Datos error:" + error);
    }
}

module.exports = {
    dbConnection
}