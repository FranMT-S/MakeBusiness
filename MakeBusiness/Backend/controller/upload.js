const path = require('path');
const fs = require('fs');

const { request, response } = require("express");
const { v4: uuidv4 } = require('uuid');




// const { updateImg } = require("../helpers/update-file");


const uploadFile = async(req = request, res = response) => {

    const {idCompany} = req.params
    const {description} = req.body

    //procesar el archivo
    const file = req.files.file; // ! files.imagen contiene el archivo enviado
    const partsName = file.name.split('.')
    const fileEXtension = partsName[partsName.length - 1];
    
    const name = file.name;
    const fileName = partsName[partsName.length - 1];
    const baseName = partsName.slice(0,-1).join()
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

const sendFile = async (req = request, res = response) => {
    try{
        
        const {type,id} = req.params

        let name = path.join(__dirname, `../upload/${type}/${id}`)

        if(fs.existsSync(name))
            return res.sendFile(name)
        else{
            if(type=="users")      
                return res.sendFile(path.join(__dirname, `../upload/users/no-user-02.png`))
        
            return res.status(504).json({
                ok: false,
                msg: "El archivo no existe."
            });       
        }
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar el archivo buscado",
            error:error
        })
    }
}


module.exports = {
    uploadFile,
    sendFile
}