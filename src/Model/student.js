
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
 
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
    
    


const Student = mongoose.model("students",studentSchema)


module.exports = Student;