const { Router } = require("express");
const expressFileUpload = require('express-fileupload');

const { fileValidate } = require("../middlewares/validar-files-config");
const { uploadFile,sendFile} = require("../controller/upload");


const router = Router();

// Limite 50 MB
router.use(expressFileUpload({
    limits: {fileSize: process.env.LIMIT_FILES * 1024 * 1024},
    createParentPath:true
}));


// //Obtener archivos
//router.post('/:type/:id', uploadFile);

// //Obtener archivo
router.get('/:type/', sendFile);
router.get('/:type/:id', sendFile);






module.exports = router;