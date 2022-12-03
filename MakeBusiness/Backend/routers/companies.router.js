const { Router } = require("express");
const { check } = require("express-validator");
const expressFileUpload = require('express-fileupload');

const {
    getCompanies,getCompany,getCompanyByUser,newCompany,deleteCompany,updateCompany,
    getWeb,updateWeb,deleteWeb,
    newPage,getPage,getPages,deletePage,updatePage,
    newBlock,getBlock,getBlocks,deleteBlock,updateBlock
    } = require("../controller/companies")
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Limite 50 MB
router.use(expressFileUpload({
    limits: {fileSize: process.env.LIMIT_FILES * 1024 * 1024},
    createParentPath:true
}));

router.post("/", 
                [
                check("nameCompany", "Nombre es un campo obligatorio").notEmpty(),
                check("idUser", "el id del usuario es obligatorio obligatorios").notEmpty()
                ],
                validarCampos,
                newCompany,)

router.get("/",getCompanies)
router.get("/:id",getCompany)
router.get("/user/:id",getCompanyByUser)
router.put("/:id",updateCompany)
router.delete("/:id",deleteCompany)

//////////////
// Rutas Web
/////////////

// Id de la compania
router.put("/:id/web",updateWeb)
router.delete("/:id/web",deleteWeb)
router.get("/:id/web",getWeb)
// router.post("/:id/web", 
//                 [
//                 check("nameCompany", "Nombre es un campo obligatorio").notEmpty(),
//                 check("idUser", "el id del usuario es obligatorio obligatorios").notEmpty()
//                 ],
//                 validarCampos,
//                 newWeb,)






//////////////
// Rutas Page
/////////////

// // Id de la compania
router.post("/:id/web/pages", 
                [
                check("title", "el titulo es un campo obligatorio").notEmpty(),
                ],
                validarCampos,
                newPage)

// 
router.get("/:id/web/pages",getPages)
router.get("/:id/web/pages/:idPage",getPage)
router.put("/:id/web/pages/:idPage",updatePage)
router.delete("/:id/web/pages/:idPage",deletePage)

//////////////
// Rutas Block
/////////////

router.post("/:id/web/pages/:idPage/blocks", 
                [
                check("size", "el tamaño debe ser entre 1 a 12").notEmpty().isInt({ min: 1, max: 12 }),
                ],
                validarCampos,
                newBlock)


//
router.get("/:id/web/pages/:idPage/blocks",getBlocks)
router.get("/:id/web/pages/:idPage/blocks/:idBlock",getBlock)
router.put("/:id/web/pages/:idPage/blocks/:idBlock",updateBlock)
router.delete("/:id/web/pages/:idPage/blocks/:idBlock",deleteBlock)

module.exports = router;