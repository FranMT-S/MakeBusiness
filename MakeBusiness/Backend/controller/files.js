const path = require('path');
const fs = require('fs');

const { request, response } = require("express");
const { v4: uuidv4 } = require('uuid');

const Company = require('../models/company');
const File = require('../models/file');


// const { updateImg } = require("../helpers/update-file");


const fileUpload = async(req = request, res = response) => {

    const {idCompany} = req.params;
    let {description,baseName} = req.body;
   
    
    //procesar el archivo
    const file = req.files.file; // ! files.imagen contiene el archivo enviado
    const partsName = file.name.split('.')
    const fileEXtension = partsName[partsName.length - 1];
 
    let name = '';
    
    if(!baseName){
   
        name = file.name;
    
        baseName = partsName.slice(0,-1).join()
    }else{
        name = `${baseName}.${fileEXtension}`
    }
   
    // const id = uuidv4() ;
   
    // Generar la instancia del archivo para la base de datos
    const fileCompany = new File(
                                {
                                description,
                                name,
                                baseName,
                                idCompany
                                })

    //Generar el nombre del archivo usando el Id de la nueva instancia
    
    const newFileName = `${ fileCompany._id}.${ fileEXtension }`;
    const path = `./upload/files/${ newFileName }`;

    fileCompany.fileName = newFileName;

    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo'
            });
        }
    });

    await fileCompany.save( (err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'no se pudo crear el registro del archivo:',id
            });
        }
    })

                            
    return res.status(200).json({
        ok:true,
        msg:'Archivo subido con exito',
        file:fileCompany
    })

   
}



const returnFile = async (req = request, res = response) => {
    try{
        
        const file = await File.findById(req.params.id);

        if(file.idCompany != req.params.idCompany){
            return res.status(400).json({
                ok:false,
                msg:"no tiene acceso a este archivo"    
            })
        }

        return res.status(200).json({
            ok: true,
            file
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar el archivo buscado",
            error:error
        })
    }
}

const returnFiles = async (req = request, res = response) => {
    try {
       
        const {idCompany} = req.params;
        const files = await File.find({idCompany})
        return res.status(200).json({
            ok:true,
            files:files
        })
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:"hubo un error al obtener los archivos",
            error:error
        })
    }
}

const updateFile = async (req = request, res = response) =>{

    try{
        const {baseName, description} = req.body;


        const file = await File.findById(req.params.id);

        if(file.idCompany != req.params.idCompany){
            return res.status(400).json({
                ok:false,
                msg:"no tiene acceso a este archivo",
            })
        }

        if(baseName){
            file.name = file.name.replace(file.baseName,baseName);
            file.baseName = baseName;
        }
        if(description) file.description = description

        await file.save();
        return res.status(200).json({
            ok: true,
            msg: "archivo actualizado con exito.",
            file: file,
   
        })
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo actualizar el archivo",
            error:error
        })
    }
}


const deleteFile = async (req = request, res = response) =>{
    try{

        const file = await File.findByIdAndRemove(req.params.id);
        if(!file){
            return res.status(400).json({
                ok: false,
                msg: "El archivo ya fue eliminado o no esta registrado."
            })
        }

        if (fs.existsSync(`./upload/files/${ file.fileName }`)) {
            fs.unlinkSync(`./upload/files/${ file.fileName }`)
        }
        return res.status(200).json({
            ok: true,
            msg: "archivo removido con exito con exito.",
            file:file
        })

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo eliminar el archivo",
            error:error
        })
    }
}

module.exports = {
    fileUpload,
    returnFile,
    returnFiles,
    deleteFile,
    updateFile
}