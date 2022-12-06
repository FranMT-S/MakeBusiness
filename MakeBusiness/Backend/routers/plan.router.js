const { Router } = require("express");
const { check } = require("express-validator");

const {getPlans,getPlan,newPlan,deletePlan,updatePlan} = require("../controller/plan")
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/",getPlans)
router.get("/:id",getPlan)

router.post("/", 
                [validarJWT,
                check("name", "Nombre es un campo obligatorio").notEmpty(),
                check("price", "Precio son campos obligatorios").notEmpty(),
                check("annuity", "Anualidad son campos obligatorios").notEmpty(),
                check("limitPages", "Limite de paginas son campos obligatorios").notEmpty(),
                check("limitProducts", "Limite de productos son campos obligatorios").notEmpty(),
                check("limitFiles", "Limite de archivos son campos obligatorios").notEmpty()
                ],
                validarCampos,
                newPlan,)

router.put("/:id",validarJWT,updatePlan)
                
router.delete("/:id",validarJWT,deletePlan)


module.exports = router;