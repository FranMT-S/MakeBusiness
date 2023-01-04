/*
    Ruta: /api/login 
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { login, revalidarToken, registerCompany,registerClient } = require("../controller/login");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/renew", validarJWT, revalidarToken);

router.get("/test", (req,res) => { res.send("este es un test")});


router.post("/", [
        check("email", "El correo es invalido, o verifique que el campo no este vacío.").isEmail(),
        check("password", "La contraseña es obligatorio.").not().isEmpty(),
        validarCampos
    ],
    login);

router.post("/register/company", [
        check("userName", "El nombre de usuario, o verifique que el campo no este vacío.").notEmpty(),
        check("email", "La email es obligatorio.").isEmail(),
        check("nameCompany", "el nombre de la compania es obligatorio").notEmpty(),
        check("password", "La contraseña es obligatorio.").not().isEmpty(),
        check("idPlan", "el plan es obligatorio").notEmpty(),
        validarCampos
    ],
    registerCompany);

router.post("/register/client", [
        check("userName", "El nombre de usuario, o verifique que el campo no este vacío.").notEmpty(),
        check("email", "La email es obligatorio.").isEmail(),
        check("password", "La contraseña es obligatorio.").not().isEmpty(),
        validarCampos
    ],
    registerClient);



module.exports = router;