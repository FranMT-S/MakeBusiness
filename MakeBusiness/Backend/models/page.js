const { Schema, model} = require("mongoose");
const {blockSchema:Block} = require("../models/block")

const pageSchema = Schema({
                    title: {
                        type: String,
                        required: true,
                    },
                    js: {
                        type: String,
                        required: false,
                    },
                    css: {
                        type: String,
                        required: false
                    },
                    description:{
                        type: String,
                        required: false,
                    },
                    blocks:[Block],
                    useGenericFooter: {
                        type: Boolean,
                        require:false,
                        default: false
                    },
                    useGenericHeader: {
                        type: Boolean,
                        require:false,
                        default: true
                    },
                    idWeb: {
                        type: Schema.Types.ObjectId,
                        ref: 'Web',
                        required: true,
                    },
                            
            },{ collection: 'Page',versionKey: false })

module.exports = model("Page",pageSchema)