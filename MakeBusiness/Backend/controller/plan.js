const {request, response} = require("express")
const Plan = require("../models/plan")

const getPlans = async (req = request, res = response) =>{
    try{
        const plans = await Plan.find({});
        return res.status(200).json({
            ok: true,
            plans
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"hubo un error al obtener los planes",
            error:error
        })
    }
}

const getPlan = async (req = request, res = response) =>{
    try{
        const plan = await Plan.findById(req.params.id);

        if(!plan){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar el plan  buscado"
            })
        }

        return res.status(200).json({
            ok: true,
            plan
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar el plan buscado",
            error:error
        })
    }
}


const newPlan = async (req = request, res = response) =>{
    try{

        const plan = new Plan(req.body)
        await plan.save();
        return res.status(200).json({
            ok: true,
            msg: "Plan creado con exito.",
            plan: plan
        })
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo crear el plan",
            error:error
        })
    }
}

const updatePlan = async (req = request, res = response) =>{

    try{

        const plan = await Plan.findByIdAndUpdate(req.params.id, req.body,{ new: true});
        if(!plan){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar el plan",
                error:error
            })
        }

        return res.status(200).json({
            ok: true,
            msg: "Plan actualizado con exito.",
            plan: plan
        })
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo actualizar el plan",
            error:error
        })
    }
}

const deletePlan = async (req = request, res = response) =>{
    try{

        const plan = await Plan.findByIdAndRemove(req.params.id);
        if(!plan){
            return res.status(400).json({
                ok: false,
                msg: "El plan ya fue eliminado o no esta registrado."
            })
        }
        
        return res.status(200).json({
            ok: true,
            msg: "Plan removido con exito con exito.",
            plan:plan
        })

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo eliminar el plan",
            error:error
        })
    }
}

module.exports =  {
                    getPlans,
                    getPlan,
                    newPlan,
                    deletePlan,
                    updatePlan
                };