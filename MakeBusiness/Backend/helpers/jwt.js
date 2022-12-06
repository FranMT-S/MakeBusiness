const jwt = require("jsonwebtoken");

const generarJWT = (uid, time = '2h') => {
    const payload = { uid };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: time }, (err, token) => {
            if (err) {
                console.log(`Error al momento de generar el token ${err}`);
                reject("Error al momento de generar el token");
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
};