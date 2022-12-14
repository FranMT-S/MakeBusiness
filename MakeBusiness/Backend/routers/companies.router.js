const { Router } = require("express");
const { check } = require("express-validator");
const expressFileUpload = require('express-fileupload');

const {
    getCompanies,getCompany,getCompanyByUser,newCompany,deleteCompany,updateCompany,
    getWeb,updateWeb,deleteWeb,getCompaniesAndWeb,
    newPage,getPage,getPages,deletePage,updatePage,getWebWithPages,
    newBlock,getBlock,getBlocks,deleteBlock,updateBlock
    } = require("../controller/companies")
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Limite 50 MB
router.use(expressFileUpload({
    limits: {fileSize: process.env.LIMIT_FILES * 1024 * 1024},
    createParentPath:true
}));

router.post("/", 
                [validarJWT,
                check("nameCompany", "Nombre es un campo obligatorio").notEmpty(),
                check("idUser", "el id del usuario es obligatorio obligatorios").notEmpty()
                ],
                validarCampos,
                newCompany,)

router.get("/",getCompanies)
router.get("/with-webs",getCompaniesAndWeb)
router.get("/:id",getCompany)
router.get("/user/:id",getCompanyByUser)
router.put("/:id",validarJWT,updateCompany)
router.delete("/:id",validarJWT,deleteCompany)





//////////////
// Rutas Web
/////////////
// Id de la compania
router.put("/:id/web",validarJWT,updateWeb)
router.delete("/:id/web",validarJWT,deleteWeb)
router.get("/:id/web",getWeb)
router.get("/:id/web-pages",getWebWithPages)







//////////////
// Rutas Page
/////////////

// // Id de la compania
router.post("/:id/web/pages", 
                [
                    validarJWT,
                check("title", "el titulo es un campo obligatorio").notEmpty(),
                ],
                validarCampos,
                newPage)

// 
router.get("/:id/web/pages",getPages)
router.get("/:id/web/pages/:idPage",getPage)
router.put("/:id/web/pages/:idPage",validarJWT,updatePage)
router.delete("/:id/web/pages/:idPage",validarJWT,deletePage)

//////////////
// Rutas Block
/////////////

router.post("/:id/web/pages/:idPage/blocks", 
                [validarJWT,
                check("size", "el tama??o debe ser entre 1 a 12").notEmpty().isInt({ min: 1, max: 12 }),
                ],
                validarCampos,
                newBlock)


//
router.get("/:id/web/pages/:idPage/blocks",getBlocks)
router.get("/:id/web/pages/:idPage/blocks/:idBlock",getBlock)
router.put("/:id/web/pages/:idPage/blocks/:idBlock",validarJWT,updateBlock)
router.delete("/:id/web/pages/:idPage/blocks/:idBlock",validarJWT,deleteBlock)

module.exports = router;