const {request, response} = require("express")
const User = require("../models/user")

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

        const emailUser = await User.findOne({"email":email});
      
        if(emailUser){
           if(emailUser._id != req.params.id){
                return res.status(400).json({
                    ok:false,
                    msg:"el correo electronico ya esta siendo usado",
                  
                })
            }
        }
        
       
        const user = await User.findByIdAndUpdate(req.params.id, req.body,{ new: true});
        
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