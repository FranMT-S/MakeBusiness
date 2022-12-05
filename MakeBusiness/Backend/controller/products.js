const path = require('path');
const fs = require('fs');


const { request, response } = require("express");
const { v4: uuidv4 } = require('uuid');
const Company = require('../models/company');
const Product = require('../models/product');


// const { updateImg } = require("../helpers/update-file");


const newProduct = async(req = request, res = response) => {

    const {idCompany} = req.params



    //procesar el archivo
    const {image} = req.files;
    const partsName = image.name.split('.')
    const fileEXtension = partsName[partsName.length - 1];
    
    // Nombre archivo
    const nameImage = `${ uuidv4() }.${ fileEXtension }`;
     
    // Generar la instancia del archivo para la base de datos
    const product = new Product({...req.body, image:nameImage,idCompany})

    //Generar el nombre del archivo usando el Id de la nueva instancia
    const path = `./upload/products/${ nameImage }`;

    image.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al crear la imagen en la ruta destino "products"'
            });
        }
    });

    await product.save( (err) => {
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
        file:product
    })

   
}



const getProduct = async (req = request, res = response) => {
    try{
        
        const product = await Product.findById(req.params.id);
        
        if(!product){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo el producto buscado"
            })
        }

        if(product.idCompany != req.params.idCompany){
            return res.status(400).json({
                ok:false,
                msg:"no tiene acceso a este archivo"    
            })
        }

        return res.status(200).json({
            ok: true,
            product
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar el archivo buscado",
            error:error
        })
    }
}

const getProducts = async (req = request, res = response) => {
    try {
       
        const {idCompany} = req.params;
        const products = await Product.find({idCompany})
        return res.status(200).json({
            ok:true,
            products:products
        })
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:"hubo un error al obtener los archivos",
            error:error
        })
    }
}

const updateProduct = async (req = request, res = response) =>{

    try{
     
        const data = req.body

        const product = await Product.findById(req.params.id);

        if(product.idCompany != req.params.idCompany){
            return res.status(400).json({
                ok:false,
                msg:"no tiene acceso a este archivo",
            })
        }

        console.log(req.files)
        if(req.files && req.files.image){
            //procesar el archivo
            const {image} = req.files;
            const partsName = image.name.split('.')
            const fileEXtension = partsName[partsName.length - 1];
            
            // Nombre archivo
            const nameImage = `${ uuidv4() }.${ fileEXtension }`;
            
            //Generar el nombre del archivo usando el Id de la nueva instancia
            const path = `./upload/products/${ nameImage }`;

            if (product.image != "" && fs.existsSync(`./upload/products/${ product.image }`)) {
                fs.unlinkSync(`./upload/products/${ product.image }`)
            }

            image.mv(path, (err) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error al actualizar la imagen en la ruta destino "products"'
                    });
                }
            });
             
             data.image = nameImage;
             console.log("///")
             console.log(nameImage)
             console.log(data)
        }
        

        const productUpdate = await Product.findByIdAndUpdate(req.params.id,data,{new:true});

        return res.status(200).json({
            ok: true,
            msg: "archivo actualizado con exito.",
            product: productUpdate,

        })
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo actualizar el archivo",
            error:error
        })
    }
}


const deleteProduct = async (req = request, res = response) =>{
    try{

        const product = await Product.findByIdAndRemove(req.params.id);
  
        if(!product){
            return res.status(400).json({
                ok: false,
                msg: "El archivo ya fue eliminado o no esta registrado."
            })
        }


        if (product.image != "" && fs.existsSync(`./upload/products/${ product.image }`)) {
            fs.unlinkSync(`./upload/products/${ product.image }`)
        }
        return res.status(200).json({
            ok: true,
            msg: "archivo removido con exito con exito.",
            product:product
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
    newProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct
}