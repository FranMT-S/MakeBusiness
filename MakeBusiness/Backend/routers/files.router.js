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

// actualizar campos de archivo
router.put('/:idCompany/:id',updateFile)

// //Obtener archivos
router.get('/:idCompany', returnFiles);

// //Obtener archivo
// router.get('/:fileName', returnFile);
router.get('/:idCompany/:id', returnFile);

//Crear archivos
router.post('/:idCompany/files',fileValidate,  fileUpload);

// Eliminar archivos
router.delete("/:id",deleteFile)




module.exports = router;