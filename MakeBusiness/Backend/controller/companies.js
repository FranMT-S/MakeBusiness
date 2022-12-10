const path = require('path');
const fs = require('fs');


const { v4: uuidv4 } = require('uuid');
const {request, response} = require("express")

const Company = require("../models/company")
const Web = require("../models/web")
const User = require("../models/user")
const Page = require("../models/page");
const File = require("../models/file");
const Product = require("../models/product");
const { default: mongoose } = require('mongoose');
const { Block } = require('../models/block');



const getCompanies = async (req = request, res = response) =>{
    try{
        const companies = await Company.find({});
        return res.status(200).json({
            ok: true,
            companies
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"hubo un error al obtener las companias",
            error:error
        })
    }
}

const getCompaniesAndWeb = async (req = request, res = response) =>{
    try{
        const companies = await Company.aggregate([
            {
                "$lookup" : {
                    "localField" : "_id",
                    "from" : "Web",
                    "foreignField" : "idCompany",
                    "as" : "web"
                }
            }, 
            {
                "$unwind" : {
                    "path" : "$web",
                    "preserveNullAndEmptyArrays" : false
                }
            }, 
                        
            {
                "$lookup" : {
                    "localField" : "web._id",
                    "from" : "Page",
                    "foreignField" : "idWeb",
                    "as" : "page"
                }
            },
 
            {
                "$project" : {
                    "_id" : 1,
                    "nameCompany" : 1,
                    "description" : 1,
                    "category" : 1,
                    "state" : 1,
                    "web._id":1,
                    "web.logo" : 1,
                    "web.keywords" : 1,
                    "web.description" : 1,  
                    "web.pageMain": 1,
                    "page._id":1          
                }
            },
 
        ] )


        
        return res.status(200).json({
            ok: true,
            companies
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"hubo un error al obtener las companias",
            error:error
        })
    }
}

const getCompany = async (req = request, res = response) =>{
    try{
        const company = await Company.findById(req.params.id);
        if(!company){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar la compania buscado"
            })
        }
        
        return res.status(200).json({
            ok: true,
            company
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar la compania buscado",
            error:error
        })
    }
}

const getCompanyByUser = async (req = request, res = response) =>{
    try{
        const company = await Company.findOne({idUser:mongoose.Types.ObjectId(req.params.id)});
        if(!company){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar la compania buscado"
            })
        }
        
        return res.status(200).json({
            ok: true,
            company
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar la compania buscado",
            error:error
        })
    }
}


const newCompany = async (req = request, res = response) =>{
    try{

        const user = await User.findById(req.body.idUser);
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"el usuario no existe"
           
            })
        }


        const company = new Company(req.body)
        const web = new Web({title:req.body.nameCompany, idCompany:company._id});
        
        // Guardar Compania y web
        await company.save();
        await web.save();
        return res.status(200).json({
            ok: true,
            msg: "compania creado con exito.",
            company: company,
            web: web._id
        })
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo crear la compania",
            error:error
        })
    }
}

const updateCompany = async (req = request, res = response) =>{

    try{

        const {nameCompany} = req.body;

        // Comprobar que la compania no exista
        const companyName = await Company.findOne({"nameCompany":nameCompany});
        
        if(companyName && companyName._id != req.params.id){
            return res.status(400).json({
                ok:false,
                msg:"el nombre  ya esta siendo usado",
                
            })           
        }

        const company = await Company.findByIdAndUpdate(req.params.id, req.body,{ new: true});
        if(!company){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar la compania",
                error:error
            })
        }

        return res.status(200).json({
            ok: true,
            msg: "compania actualizado con exito.",
            company: company
        })
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo actualizar la compania",
            error:error
        })
    }
}

const deleteCompany = async (req = request, res = response) =>{
    try{

        const company = await Company.findByIdAndRemove(req.params.id);
      
        if(!company){
            return  res.status(400).json({
                ok: false,
                msg: "la compania ya fue eliminado o no esta registrada."
            })
        }
        await User.findByIdAndRemove(company.idUser)
        const web = await Web.findOneAndRemove({idCompany: req.params.id})
        await File.deleteMany({idCompany: req.params.id})
        await Product.deleteMany({idCompany: req.params.id})
        await Page.deleteMany({idWeb:web._id})
        
        return res.status(200).json({
            ok: true,
            msg: "compania removido  con exito.",
            company
        })

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo eliminar la compania",
            error:error
        })
    }
}

// Web Funciones


const getWeb = async (req = request, res = response) =>{
    try{
        const web = await Web.findOne({idCompany:req.params.id});
        if(!web){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar la web buscado"
            })
        }

        return res.status(200).json({
            ok: true,
            web
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar la web buscado",
            error:error
        })
    }
}


const updateWeb = async (req = request, res = response) =>{

    try{
  

        const web = await Web.findOne({idCompany:req.params.id});      
        const newData = req.body;

        if(!web){
           web = new Web(req.param.id);
        }
       
  
        if (req.files && Object.keys(req.files).length != 0) {
            const {logo, favicon} = req.files;
           
     
            if(logo?.truncated || favicon?.truncated){
                return res.status(400).json({
                    ok: false,
                    msg: 'la imagen no puede sobrepasar los 50MB'
                });
            }
    
    
            //procesar el archivo
            if(logo){
                let partsName = logo.name.split('.')
                let fileEXtension = partsName[partsName.length - 1];
                
                const nameLogo = `${ uuidv4() }.${ fileEXtension }`;
                
                //Generar el nombre del archivo usando el Id de la nueva instancia
                const pathLogo = `./upload/web/${ nameLogo }`;

    
                if (web.logo != "" && fs.existsSync(`./upload/web/${ web.logo }`)) {
                    fs.unlinkSync(`./upload/web/${ web.logo }`)
                }
    
                logo.mv(pathLogo, (err) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            msg: 'Error al actualizar la imagen en la ruta destino "products"'
                        });
                    }
                });
                
                newData.logo = nameLogo;
            }
    
    
     
    
            if(favicon){
                let partsName = favicon.name.split('.')
                let fileEXtension = partsName[partsName.length - 1];
                
                const nameFavicon = `${ uuidv4() }.${ fileEXtension }`;
                
                //Generar el nombre del archivo usando el Id de la nueva instancia
                const pathfavicon = `./upload/web/${ nameFavicon }`;
    
                if (web.favicon != "" && fs.existsSync(`./upload/web/${ web.favicon }`)) {
                    fs.unlinkSync(`./upload/web/${ web.favicon }`)
                }
    
                favicon.mv(pathfavicon, (err) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            msg: 'Error al actualizar la imagen en la ruta destino "products"'
                        });
                    }
                });
    
                newData.favicon = nameFavicon;
            }
        }
       

        const update = await Web.findOneAndUpdate({idCompany:req.params.id},newData, {returnDocument:'after'});
        return res.status(200).json({
            ok: true,
            msg: "archivo actualizado con exito.",
            web:update
        })
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo actualizar el archivo",
            error:error
        })
    }
}

const deleteWeb = async (req = request, res = response) =>{
    try{

        const web = await Web.findByIdAndRemove(req.params.id);
        if(!web){
            return  res.status(400).json({
                ok: false,
                msg: "la web ya fue eliminado o no esta registrada."
            })
        }
        
        return res.status(200).json({
            ok: true,
            msg: "web removido  con exito.",
            web:web
        })

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo eliminar la compania",
            error:error
        })
    }
}

/*
    Paginas

*/

const newPage = async (req = request, res = response) =>{
    try{
        const {id} = req.params
        

        const web = await Web.findOne({idCompany:id});
        
                
        if(!web){
            return res.status(400).json({
                ok:false,
                msg:"no se pudo encontrar la web"        
            })
        }

        const page = new Page({idWeb:web._id, title:req.body.title})

        await page.save();

        if(!web.pageMain){
            web.pageMain = page._id
            await web.save()
        }

        return res.status(200).json({
            ok:true,
            page
       
        })
  
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo crear la pagina",
            error:error
        })
    }
}

const getPage = async (req = request, res = response) =>{
    try{
        const {id, idPage} = req.params;

        const web = await Web.findOne({idCompany:id});
        if(!web){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar la web de la pagina buscado"
            })
        }
        
        const page = await Page.findById(idPage);

        if(!page){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar la pagina buscada"
            })
        }

        return res.status(200).json({
            ok: true,
            page
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar la pagina  buscado",
            error:error
        })
    }
}

const getPages = async (req = request, res = response) =>{
    try{
        // const web = await Web.findOne({idCompany:req.params.id});
        const web = await Web.findOne({idCompany:req.params.id});
       
        if(!web){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar la web de la pagina buscado"
            })
        }

        const pages = await Page.find({idWeb:web._id})
        
        return res.status(200).json({
            ok: true,
            pages
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar la web buscado",
            error:error
        })
    }
}

const getWebWithPages = async (req = request, res = response) =>{
    try{
        // const web = await Web.findOne({idCompany:req.params.id});
       const web = await Web.aggregate([
                                {
                                    $lookup:{
                                        from:"Page",
                                        localField:"_id",
                                        foreignField:"idWeb",
                                        as:"pages"
                                    }
                                },
                                {
                                    $match:{
                                        idCompany:mongoose.Types.ObjectId(req.params.id) 
                                    }
                                }
                            ])
       
        if(!web.length > 0){
            return res.status(400).json({
                ok:false,
                msg:"No se pudo encontrar la web de las paginas buscado"
            })
        }
        
        return res.status(200).json({
            ok: true,
            web: web[0]
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar la web buscado",
            error:error
        })
    }
}

const deletePage = async (req = request, res = response) =>{
    try{

        const {idPage} = req.params;

        const page = await Page.findByIdAndRemove(idPage);
        if(!page){
            return  res.status(400).json({
                ok: false,
                msg: "la pagina ya fue eliminado o no esta registrada."
            })
        }

        const web = await Web.findById(page.idWeb);              
        if(!web){
            if(web.pageMain == page._id){
                web.pageMain = null;
                web.save();
            }
        }
        
        return res.status(200).json({
            ok: true,
            msg: "la pagina fue  removida con exito.",
            page:page
        })

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo eliminar la compania",
            error:error
        })
    }
}


const updatePage = async (req = request, res = response) =>{
    try{     
        const newData = req.body;
        const page = await Page.findByIdAndUpdate(req.params.idPage,newData,{new:true});
        return res.status(200).json({
            ok: true,
            msg: "archivo actualizado con exito.",
            page
        })
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo actualizar el archivo",
            error:error
        })
    }
}
/*
===========
    Bloques
===========
*/

/*
    Paginas

*/

const newBlock = async (req = request, res = response) =>{
    try{
        const {idPage} = req.params
        

        const page = await Page.findById(idPage);
        const block = new Block(req.body)
        
        if(!page){
            return res.status(400).json({
                ok:false,
                msg:"no se pudo encontrar la pagina"        
            })
        }

        block.position = page.blocks.length + 1;
        block.HTML = ""
        page.blocks.push(block);

        page.save();
   
        return res.status(200).json({
            ok:true,
            page,
            block
        })
  
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo crear la pagina",
            error:error
        })
    }
}

const getBlock = async (req = request, res = response) =>{
    try{
        const {idPage,idBlock} = req.params
    
        const page = await Page.findOne(
                            {"_id":mongoose.Types.ObjectId(idPage),"blocks._id":mongoose.Types.ObjectId(idBlock)},
                            {"blocks.$":1}                      
                            );
                            
                                  
        if(!page){
            return res.status(400).json({
                ok:false,
                msg:"no se pudo encontrar el bloque"        
            })
        }

  
       
        
        return res.status(200).json({
            ok: true,
            idWeb: page._id,
            block: page.blocks[0]    
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar el bloque  buscado",
            error:error
        })
    }
}

const getBlocks = async (req = request, res = response) =>{
    try{
        const {idPage} = req.params
    
        const page = await Page.findById(idPage);
        
        
        if(!page){
            return res.status(400).json({
                ok:false,
                msg:"no se pudo encontrar el bloque"        
            })
        }

        const blocks = page.blocks;
        
        return res.status(200).json({
            ok: true,
            idPage,
            blocks
        });

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo encontrar el boque",
            error:error
        })
    }
}

const deleteBlock = async (req = request, res = response) =>{
    try{

        const {idPage,idBlock} = req.params
    
        // $pull para eliminar de un arreglo un elemento
        const page = await Page.findByIdAndUpdate(idPage,
                                    {$pull:{
                                        "blocks":{"_id":mongoose.Types.ObjectId(idBlock)}
                                        }},{returnDocument:'after'});
            

        if(!page){
            return res.status(400).json({
                ok:false,
                msg:"no se pudo encontrar la pagina"        
            })
        }


       
        return res.status(200).json({
            ok: true,
            msg: "se elimino con exito el bloque.",
            blocks:page.blocks,
        })

    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo eliminar la compania",
            error:error
        })
    }
}


const updateBlock = async (req = request, res = response) =>{

    try{     
        
        const {idPage,idBlock} = req.params

        const newData = {"_id":mongoose.Types.ObjectId(idBlock),...req.body}

        const updatePage = await Page.findOneAndUpdate(
                            {"_id":mongoose.Types.ObjectId(idPage),"blocks._id":mongoose.Types.ObjectId(idBlock)},
                            {$set:{"blocks.$":newData}},
                            {returnDocument:'after'});
            
 
        const block = updatePage.blocks.find(block => block._id == idBlock)

        return res.status(200).json({
            ok: true,
            msg: "bloque actualizado con exito.",
            block,
            blocks: updatePage.blocks
        })
    }catch (error){
        return res.status(400).json({
            ok:false,
            msg:"No se pudo actualizar el archivo",
            error:error
        })
    }
}

module.exports =  {
                    getCompanies,
                    getCompany,
                    getCompaniesAndWeb,
                    getCompanyByUser,
                    getWebWithPages,
                    newCompany,
                    deleteCompany,
                    updateCompany,
                    getWeb,
                    deleteWeb,
                    updateWeb,
                    newPage,
                    getPage,
                    getPages,
                    deletePage,
                    updatePage,
                    newBlock,
                    getBlock,
                    getBlocks,
                    deleteBlock,
                    updateBlock
                };