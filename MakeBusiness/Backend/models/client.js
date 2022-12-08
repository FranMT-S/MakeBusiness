const { Schema, model} = require("mongoose");
const { productHistorySchema:Product } = require("./productHistory");


const clientSchema = Schema({
                    idUser: {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                        required: true,
                    },
                    historical:[Product],
                                              
            },{ collection: 'Client',versionKey: false })

module.exports = model("Client",clientSchema)