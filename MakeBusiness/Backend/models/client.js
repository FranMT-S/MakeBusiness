const { Schema, model} = require("mongoose");
const { productHistorySchema } = require("./productHistory");


const clientSchema = Schema({
                    idUser: {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                        required: true,
                    },
                    historical:[productHistorySchema],
                                              
            },{ collection: 'Client',versionKey: false })

module.exports = model("Client",clientSchema)