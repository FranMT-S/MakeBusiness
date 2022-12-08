const { Schema, model, default: mongoose} = require("mongoose");



const UserSchema = Schema({
                    userName: {
                        type: String,
                        required: true,

                    },
                    email: {
                        type: String,
                        required: true,
                        index: true,
                        unique:true
                    },
                    password: {
                        type: String,
                        required: true,
                    },
                    image: {
                        type: String,
                        required: false,
                    },
                    type:{
                        type: String,
                        enum : ['client','admin','company'], 
                        required: true,
                    }             
            },{ collection: 'User',versionKey: false }
)
  


module.exports = model("User",UserSchema)