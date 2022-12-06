const { request, response } = require("express")
const { generarJWT } = require("../helpers/jwt");

const Usuario = require("../models/user");


const login = async(req = request, res = response) => {

    const { email, password } = req.body;
    try {
        // Validar email.
        const userExist = await Usuario.findOne({ email });
        if (!userExist) {
            return res.status(404).json({
                ok: false,
                msg: "El email es inválido."
            });
        }
        // Validar password
        if (password != userExist.password) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña es incorrecta."
            });
        }
        // Generacion de JWT
        const token = await generarJWT(userExist.id);
        const {  ...data } = userExist._doc;
 
        delete data['password']; // eliminar password del objeto que se envia
        data.uid = userExist._id;
        res.status(200).json({
            ok: true,
            data,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};

const revalidarToken = async(req = request, res = response) => {

    //obtener uid
    const { uid } = req;

    //renovar nuevo JWT
    const token = await generarJWT(uid);

    //obtener información
    const data = await Usuario.findById(uid);


    return res.status(200).json({
        ok: true,
        data,
        token
    });
};

module.exports = {
    login,
    revalidarToken
};