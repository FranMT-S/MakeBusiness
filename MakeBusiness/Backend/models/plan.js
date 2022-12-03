const { Schema, model} = require("mongoose");

const planSchema = Schema({
                    name: {
                        type: String,
                        required: true,
                        index: true,
                        unique:true
                    },
                    description: {
                        type: String,
                        required: false,
                    },
                    price: {
                        type: Number,
                        required: true,
                    },
                    annuity:{
                        type: String,
                        required: true,
                        default:"anual"
                    },
                    limitPages: {
                        type: Number,
                        required: true,
                    },
                    limitProducts: {
                        type: Number,
                        required: true,
                    },
                    limitFiles: {
                        type: Number,
                        required: true,
                    }             
            },{ collection: 'Plan',versionKey: false })

module.exports = model("Plan",planSchema)