const { Router } = require("express");

const { getClient, getClients, updateHistorical } = require("../controller/clients");



const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

router.get("/",getClients)
router.get("/:idUser",getClient)

// router.put("/:id",validarJWT,updateHistorical)
router.put("/:idUser",updateHistorical)
                
module.exports = router;