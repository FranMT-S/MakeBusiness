const { Router } = require("express");
const { check } = require("express-validator");

const {getUsers,getUser,newUser,deleteUser,updateUser} = require("../controller/users")
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/",getUsers)
router.get("/:id",getUser)

router.post("/", 
                [
                check("userName", "Nombre es un campo obligatorio").notEmpty(),
                check("email", "El email no es valido").isEmail(),
                check("password", "contraseña es un campos obligatorios").notEmpty(),
                check("type", "el tipo9 de usuario es un campos obligatorios").notEmpty(),
                ],
                validarCampos,
                newUser,)

router.put("/:id",updateUser)
                
router.delete("/:id",deleteUser)


module.exports = router;