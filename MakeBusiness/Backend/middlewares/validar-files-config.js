const { response, request } = require("express");

const fileValidate = (req=request, res=response, next)=>{
    const {file} = req.files;
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    if(!file){
        return res.status(400).json({
            ok: false,
            msg: 'no se ha enviado el parametro "file" nombre su parametro correctamente o no se envio ningun archivo', 
        });
    }

    if(file.truncated){
        return res.status(400).json({
            ok: false,
            msg: 'el archivo no puede sobrepasar los 50MB'
        });
    }
    next();
}

const imageValidate = (req=request, res=response, next)=>{

    const {image} = req.files;
    


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo o imagen'
        });
    }

    if(!image){
        return res.status(400).json({
            ok: false,
            msg: 'no se ha enviado el parametro "image" nombre su parametro correctamente o no se envio ningun archivo', 
        });
    }

    if(image.truncated){
        return res.status(400).json({
            ok: false,
            msg: 'la imagen no puede sobrepasar los 50MB'
        });
    }
    next();
}


module.exports = {
    fileValidate,
    imageValidate
}