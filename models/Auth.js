const mongoose = require('mongoose')
const {isEmail} = require('validator')

const AuthSchema = new mongoose.Schema({
    username  : {
        type: String,
        required: true
    },
    email  : {
        type: String,
        required: [true, 'Please enter email'],
        unique :true,
        lowercase : true,
        validate : [isEmail , 'Please enter a valid email']
    },
    password  : {
        type: String,
        required: [true, 'Please enter a valid password'],
        
    }
},{timestamps : true})

module.exports = mongoose.model('Auth', AuthSchema)