
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
 
    author : {
        type: Schema.Types.ObjectId,
        ref: 'students'
    },
    title :{
        type:String,
        required:true,
    },
    topic : {
        type : Schema.Types.ObjectId,
        ref : 'topics'
    }
    ,
    date :{
        type : Date,
        default:Date.now
    },
    estimatedTime:{
        type:Number
    },
    questions:[
        {
            title :{
                type:String,
                required:true,

                
            },
            options:[{

                title : {type : String, required:true},
                isCorrect :{type : Boolean , required:true }
            }]
        }
    ],

    takenBy :{
        type :Number,
        default : 0
    }
    ,
    duration : {
        type : Number,
        required : true,
    }
    
    } )
    
    


const Quiz = mongoose.model("quizzes",quizSchema)


module.exports = Quiz;