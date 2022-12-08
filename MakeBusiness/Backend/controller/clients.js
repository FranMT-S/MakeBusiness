const {request, response} = require("express")
const Client = require("../models/client")
 


const getClients = async (req = request, res = response) =>{
    try{
        const clients = await Client.find({});
        return res.status(200).json({
            ok: true,
            clients
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"hubo un error al obtener los clients",
            error:error
        })
    }
}

const getClient = async (req = request, res = response) =>{
    try{
        const client = await Client.findOne({idUser:req.params.idUser});
        if(!client){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar el cliente buscado"
            })
        }

        return res.status(200).json({
            ok: true,
            client
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar el cliente buscado",
            error:error
        })
    }
}


// const newClient = async (req = request, res = response) =>{
  
// }

const updateHistorical = async (req = request, res = response) =>{

    try{
      
        const client = await Client.findOne({idUser:req.params.idUser})

        return res.status(200).json({
            ok: true,
            msg: "historico actualizado con exito.",
            client: client
        })
        
    
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo actualizar el historico",
            error:error
        })
    }
}

// const deleteClient = async (req = request, res = response) =>{
   
// }

module.exports =  {
                    getClients,
                    getClient,
                    updateHistorical
                    // newClient,
                    // deleteClient,
                };