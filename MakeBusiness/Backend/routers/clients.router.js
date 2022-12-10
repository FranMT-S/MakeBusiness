const { Router } = require("express");
const { check } = require("express-validator");
const { getClient, getClients, updateHistorical } = require("../controller/clients");


const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/",getClients)
router.get("/:idUser",getClient)

// router.put("/:id",validarJWT,updateHistorical)
router.post("/:idUser",[validarJWT,
    check("idProduct", "el id del producto es obligatorio").notEmpty(),
    check("name", "el nombre de es obligatorio").notEmpty(),
    check("price", "el precio es obligatorio.").not().isEmpty(),
    check("quantity", "la cantidad es obligatorio").notEmpty(),
    validarCampos,
],updateHistorical)
                
module.exports = router;