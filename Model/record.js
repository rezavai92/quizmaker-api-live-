
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
 
    quiz:{
        type: Schema.Types.ObjectId,
        refs:"quizzes"
    },
    answerSheet:{
        type:Array,
        required:true
    },

    obtainedMarks:{
        type : Number,
        required:true
    },
    totalMarks :{
        type:Number,
        required:true
    },

    // answers:[
    //     {
    //         questionTitle:{
    //             type : String
    //         },
    //         answeredOption :{
    //             type : String
    //         }
    //     }
    // ]
    
    date :{
        type : Date,
        default : new Date().now
    }
    
    } )
    
    


const Record = mongoose.model("records",recordSchema)


module.exports = Record;