const { Router } = require("express");
const { check } = require("express-validator");
const expressFileUpload = require('express-fileupload');

const {getUsers,getUser,newUser,deleteUser,updateUser} = require("../controller/users")
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


// Limite 50 MB
router.use(expressFileUpload({
    limits: {fileSize: process.env.LIMIT_FILES * 1024 * 1024},
    createParentPath:true
}));

router.get("/test", (req,res) => { res.send("este es un test")});

router.get("/",getUsers)
router.get("/:id",getUser)

router.post("/", 
                [validarJWT,
                check("userName", "Nombre es un campo obligatorio").notEmpty(),
                check("email", "El email no es valido").isEmail(),
                check("password", "contraseña es un campos obligatorios").notEmpty(),
                check("type", "el tipo9 de usuario es un campos obligatorios").notEmpty(),
                ],
                validarCampos,
                newUser,)

router.put("/:id",validarJWT,updateUser)
                
router.delete("/:id",validarJWT,deleteUser)


module.exports = router;