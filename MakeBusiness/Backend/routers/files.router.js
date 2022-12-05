const { Router } = require("express");
const expressFileUpload = require('express-fileupload');

const { fileValidate } = require("../middlewares/validar-files-config");
const { fileUpload,returnFile,returnFiles,deleteFile ,updateFile} = require("../controller/files");


const router = Router();

// Limite 50 MB
router.use(expressFileUpload({
    limits: {fileSize: process.env.LIMIT_FILES * 1024 * 1024},
    createParentPath:true
}));

// Archivos
router.post('/:idCompany',fileValidate,  fileUpload);
router.get('/:idCompany', returnFiles);
router.get('/:idCompany/:id', returnFile);
router.put('/:idCompany/:id',updateFile)
router.delete("/:idCompany/:id",deleteFile)




module.exports = router;