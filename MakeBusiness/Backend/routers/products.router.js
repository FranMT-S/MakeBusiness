const { Router } = require("express");
const expressFileUpload = require('express-fileupload');

const { check } = require("express-validator");
const {getProducts,getProduct,newProduct,deleteProduct,updateProduct} = require("../controller/products")
const { imageValidate } = require("../middlewares/validar-files-config");
const { validarJWT } = require("../middlewares/validar-jwt");



const router = Router();

// Limite 50 MB
router.use(expressFileUpload({
    limits: {fileSize: process.env.LIMIT_FILES * 1024 * 1024},
    createParentPath:true
}));

router.get("/:idCompany",getProducts)
router.get("/:idCompany/:id",getProduct)

// Nuevo producto
router.post("/:idCompany",
                    [ validarJWT,
                        check("name", "Nombre es un campo obligatorio").notEmpty(),
                        check("price", "el precio es un campo obligatorio ").notEmpty(),
                        check("description", "la descripcion es un campo obligatorio").notEmpty(),
                    ],
            imageValidate, newProduct)

router.put("/:idCompany/:id",validarJWT,updateProduct)
                
router.delete("/:id",validarJWT,deleteProduct)


module.exports = router;