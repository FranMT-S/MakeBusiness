const { Schema, model} = require("mongoose");

const productSchema = Schema({
                    name: {
                        type: String,
                        required: true,

                    },                   
                    price: {
                        type: Number,
                        required: true,

                    },
                    description: {
                        type: String,
                        required: true
                    },
                    categories: {
                        type: String,
                        required: false
                    },
                    idCompany: {
                        type: Schema.Types.ObjectId,
                        ref: 'Company',
                        required: true,
                    },
                    image: {
                        type: String,
                        required: true
                    },      
                    votes: [{
                                idUser: {type:String, ref:'User',require:true},
                                point: {type:Number,require:true, min:1, max:5 }
                            }],      
            },{ collection: 'Product',versionKey: false })

module.exports = model("Product",productSchema)