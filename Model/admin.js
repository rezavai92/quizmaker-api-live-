
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
 
    name :{
        type:String,
        required:true,
        trim:true
    
    },
    email :{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:5
        
    }
    
    } )
    
    


const Admin = mongoose.model("admins",adminSchema)


module.exports = Admin;