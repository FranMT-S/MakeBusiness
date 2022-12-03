const { Schema, model} = require("mongoose");

const blockSchema = Schema({
                    size: {
                        type: Number,
                        required: true,
                        min:1,
                        max:12
                    },
                    HTML: {
                        type: String,
                        required: false,
                    },
                    position: {
                        type: Number,
                        required: false,
                        validate : {
                            validator : Number.isInteger,
                            message   : 'el campo position debe ser un numero entero'
                        }
                    },
                    type:{
                        type: String,
                        required: false,
                        enum : ['pure','dynamic'],
                        default:'pure' 
                    }
                              
            },{versionKey: false })

const Block = model("Block",blockSchema)
module.exports =  {Block, blockSchema} 