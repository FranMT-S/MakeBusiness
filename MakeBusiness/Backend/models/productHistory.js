const { Schema, model} = require("mongoose");

const productHistorySchema = Schema({
                    idProduct: {
                        type: Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true,
                    }, 
                    name: {
                        type: String,
                        required: true,

                    },                   
                    price: {
                        type: Number,
                        required: true,

                    },
                    quantity: {
                        type: Number,
                        required: true
                    },
                    total: {
                        type: Number,
                        required: true
                    },
                    date: {
                        type: Date,
                        require: true,
                        default: Date.now()
                    }      
            },{versionKey: false })

const ProductHistory = model("ProductHistory",productHistorySchema)
module.exports =  {ProductHistory, productHistorySchema} 
