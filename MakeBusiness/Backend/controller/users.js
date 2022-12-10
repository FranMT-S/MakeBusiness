const {request, response} = require("express")
const User = require("../models/user")
const Company = require("../models/company")
const Web = require("../models/web")
const Client = require("../models/client")
const { ProductHistory } = require('../models/productHistory');
const Page = require("../models/page")

const File = require("../models/file");
const Product = require("../models/product");
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { Mongoose, default: mongoose } = require("mongoose")

const getUsers = async (req = request, res = response) =>{
    try{
        const users = await User.find({});
        return res.status(200).json({
            ok: true,
            users
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"hubo un error al obtener los usuarios",
            error:error
        })
    }
}

const getUser = async (req = request, res = response) =>{
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar el usuario buscado"
            })
        }

        return res.status(200).json({
            ok: true,
            user
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar el usuario buscado",
            error:error
        })
    }
}


const newUser = async (req = request, res = response) =>{
    try{

        const {email,type} = req.body;

        const emailUser = await User.findOne({"email":email});
        if(emailUser){
            return res.status(400).json({
                ok:false,
                msg:"el correo electronico ya esta siendo usado"
            })
        }

        if(!(["client","admin","company"].find(t => t == type))){
            return res.status(400).json({
                ok:false,
                msg:"el tipo de usuario no es valido",
                type:type in ["client","admin","company"]
            })
        }


        const user = new User(req.body)
        await user.save();

        if(user.type == "company"){
            const company = new Company({nameCompany:uuidv4(),idUser:user._id})
            const web = new Web({title:company.nameCompany, idCompany:company._id});         
            // Guardar Compania y web
            await company.save();
            await web.save();
        }

        if(user.type == "client"){
            const client = new Client({idUser:user._id})
            await client.save();
        }

        return res.status(200).json({
            ok: true,
            msg: "usuario creado con exito.",
            user: user
        })
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo crear el usuario",
            error:error
        })
    }
}

const updateUser = async (req = request, res = response) =>{

    try{
      
        const {email} = req.body;
        const data = req.body

        const emailUser = await User.findOne({"email":email});
      
        if(emailUser){
           if(emailUser._id != req.params.id){
                return res.status(400).json({
                    ok:false,
                    msg:"el correo electronico ya esta siendo usado",
                  
                })
            }
        }

     
    
        if(req.files && req.files.image){
            //procesar el archivo
         
           
            const {image} = req.files;
            const partsName = image.name.split('.')
            const fileEXtension = partsName[partsName.length - 1];
            const userP = await User.findById(req.params.id);
            // Nombre archivo
            const nameImage = `${ uuidv4() }.${ fileEXtension }`;
            
            //Generar el nombre del archivo usando el Id de la nueva instancia
            const path = `./upload/users/${ nameImage }`;
            
            if(userP.image)
                if (userP.image != "" && fs.existsSync(`./upload/users/${ userP.image }`)) 
                    fs.unlinkSync(`./upload/users/${ userP.image }`)
                
            
            image.mv(path, (err) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error al actualizar la imagen en la ruta destino "users"'
                    });
                }
            });
            
            data.image = nameImage;
        }
        
   
       
        const user = await User.findByIdAndUpdate(req.params.id, data,{ new: true});
        
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar el user",
                error:error
            })
        }

        return res.status(200).json({
            ok: true,
            msg: "user actualizado con exito.",
            user: user
        })
        
    
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo actualizar el Usuario",
            error:error
        })
    }
}

const deleteUser = async (req = request, res = response) =>{
    try{

        const user = await User.findByIdAndRemove(req.params.id);
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya fue eliminado o no esta registrado."
            })
        }

        if(user.type == "company"){
   
            const company = await Company.findOneAndRemove({idUser: user._id})
            const web =   await Web.findOneAndRemove({idCompany:company._id})        
            // Guardar Compania y web
  
            await File.deleteMany({idCompany: company.id})
            await Product.deleteMany({idCompany: company.id})
            await Page.deleteMany({idWeb:web._id})
        }

        if(user.type == "client"){
            await Client.findOneAndRemove({idUser:user._id})         
        }
        
        
        return res.status(200).json({
            ok: true,
            msg: "User removido con exito con exito.",
            user:user
        })

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo eliminar el User",
            error:error
        })
    }
}

module.exports =  {
                    getUsers,
                    getUser,
                    newUser,
                    deleteUser,
                    updateUser
                };