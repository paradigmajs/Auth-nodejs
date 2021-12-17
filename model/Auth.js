const {Schema, model} = require('mongoose')

const Auth = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    hash_pass:{
        type:String
    },
    token:{
        type:String
    }
})


module.exports = model('Auth', Auth)