const { Schema, model} = require("mongoose");

const CompanySchema = Schema({
                    nameCompany: {
                        type: String,
                        required: true,
                        index: true,
                        unique:true
                    },
                    description: {
                        type: String,
                        required: false,
                    },
                    phone: {
                        type: String,
                        required: false
                    },
                    category:{
                        type: String,
                        required: false,
                    },
                    location: {
                        type: String,
                        required: false,
                    },
                    state: {
                        type: Boolean,
                        default: true
                    },
                    idPlan: {
                        type: Schema.Types.ObjectId,
                        ref: 'Plan',
                        default: '637d32a1f542e68362260f77'
                    },            
                    idUser: {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                        required: true,
                    },            
            },{ collection: 'Company',versionKey: false })

module.exports = model("Company",CompanySchema)