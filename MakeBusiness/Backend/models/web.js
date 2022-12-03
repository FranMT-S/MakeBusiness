const { Schema, model} = require("mongoose");

const webSchema = Schema({
                    idCompany: {
                        type: Schema.Types.ObjectId,
                        ref: 'Company',
                        required: true,
                    },
                    pageMain: {
                        type: Schema.Types.ObjectId,
                        ref: 'Page',
                        required: false,
                    },
                    logo: {
                        type: String,
                        required: false
                    },
                    favicon: {
                        type: String,
                        required: false
                    },  
                    title: {
                        type: String,
                        required: false,
                        default: "Web"
                    },
                    description: {
                        type: String,
                        required: false
                    },
                    keywords: {
                        type: String,
                        required: false
                    },
                    cssExtra: {
                        type: String,
                        required: false
                    },
                    jsExtra: {
                        type: String,
                        required: false
                    },
                    genericHeaderHTML: {
                        type: String,
                        required: false
                    },
                    genericFooterHTML: {
                        type: String,
                        required: false
                    },
    
                         
            },{ collection: 'Web' , versionKey: false  })

module.exports = model("Web",webSchema)