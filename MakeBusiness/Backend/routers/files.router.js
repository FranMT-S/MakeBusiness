const { Router } = require("express");
const expressFileUpload = require('express-fileupload');

const { fileValidate } = require("../middlewares/validar-files-config");
const { fileUpload,returnFile,returnFiles,deleteFile ,updateFile} = require("../controller/files");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

// Limite 50 MB
router.use(expressFileUpload({
    limits: {fileSize: process.env.LIMIT_FILES * 1024 * 1024},
    createParentPath:true
}));

router.get("/test", (req,res) => { res.send("este es un test")});

// Archivos
router.post('/:idCompany',validarJWT,fileValidate,  fileUpload);
router.get('/:idCompany', returnFiles);
router.get('/:idCompany/:id', returnFile);
router.put('/:idCompany/:id',validarJWT,updateFile)
router.delete("/:idCompany/:id",validarJWT,deleteFile)




module.exports = router;