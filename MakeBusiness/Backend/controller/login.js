const { request, response } = require("express")
const { generarJWT } = require("../helpers/jwt");


const Company = require("../models/company")
const Web = require("../models/web")
const User = require("../models/user");
const Plan = require("../models/plan")
const Client = require("../models/client")

const login = async(req = request, res = response) => {

    const { email, password } = req.body;
    try {
        // Validar email.
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({
                ok: false,
                msg: "El email es inválido."
            });
        }
        // Validar password
        if (password != userExist.password) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña es incorrecta."
            });
        }
        // Generacion de JWT
        const token = await generarJWT(userExist.id);
        const {  ...data } = userExist._doc;
 
        delete data['password']; // eliminar password del objeto que se envia
        data.uid = userExist._id;
        res.status(200).json({
            ok: true,
            data,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contáctese con el administrador"
        });
    }
};

const revalidarToken = async(req = request, res = response) => {

    //obtener uid
    const { uid } = req;

    //renovar nuevo JWT
    const token = await generarJWT(uid);

    //obtener información
    const data = await User.findById(uid);


    return res.status(200).json({
        ok: true,
        data,
        token
    });
};


const registerCompany = async(req = request, res = response) => {

    try{
        const {userName,email,nameCompany,password,idPlan} = req.body
        
        const plan = await Plan.findById(idPlan);

        if(!plan){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar el plan buscado"
            })
        }

        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({
                ok:false,
                msg:"el correo ya esta ocupado"
           
            })
        }
    
        const user = new User({userName,email,password,type:"company"});
        const company = new Company({nameCompany,idUser:user._id,idPlan:plan._id});
        const web = new Web({title:nameCompany,idCompany:company._id});

        await user.save()
        await company.save()
        await web.save()
        

        return res.status(200).json({
            ok: true,
            msg:"Registro exitoso"
        });
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: "No se pudo registrar",
            error
        });
    }
};

const registerClient = async(req = request, res = response) => {

    try{
        const {userName,email,password,} = req.body
        
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({
                ok:false,
                msg:"el correo ya esta ocupado"
           
            })
        }

        const user = new User({userName,email,password,type:"client"});
        const client = new Client({idUser:user._id})
        
        await user.save();
        await client.save();
  
        return res.status(200).json({
            ok: true,
            msg:"registro exitoso"
        });
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: "no se pudo registrar",
            error
        });
    }
};

module.exports = {
    login,
    revalidarToken,
    registerCompany,
    registerClient
};