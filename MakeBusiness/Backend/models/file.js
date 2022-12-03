const { Schema, model} = require("mongoose");

const fileSchema = Schema({
                    name: {
                        type: String,
                        required: true,

                    },                   
                    fileName: {
                        type: String,
                        required: true,

                    },
                    baseName: {
                        type: String,
                        required: true,

                    },
                    description: {
                        type: String,
                        required: false
                    },
                    idCompany: {
                        type: Schema.Types.ObjectId,
                        ref: 'Company',
                        required: true,
                    }           
            },{ collection: 'File',versionKey: false })

module.exports = model("File",fileSchema)