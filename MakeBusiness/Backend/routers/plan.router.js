const { Router } = require("express");
const { check } = require("express-validator");

const {getPlans,getPlan,newPlan,deletePlan,updatePlan} = require("../controller/plan")
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/",getPlans)
router.get("/:id",getPlan)

router.post("/", 
                [
                check("name", "Nombre es un campo obligatorio").notEmpty(),
                check("price", "Precio son campos obligatorios").notEmpty(),
                check("annuity", "Anualidad son campos obligatorios").notEmpty(),
                check("limitPages", "Limite de paginas son campos obligatorios").notEmpty(),
                check("limitProducts", "Limite de productos son campos obligatorios").notEmpty(),
                check("limitFiles", "Limite de archivos son campos obligatorios").notEmpty()
                ],
                validarCampos,
                newPlan,)

router.put("/:id",updatePlan)
                
router.delete("/:id",deletePlan)


module.exports = router;